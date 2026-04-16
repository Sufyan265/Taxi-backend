const Passenger = require('../models/Passenger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const emailjs = require('emailjs-com');

const cancelBooking = async (req, res) => {
    let success = false;
    const { email, referenceNumber } = req.body;

    if (!email || !referenceNumber) {
        return res.status(400).json({
            success,
            message: "Please provide both email and reference number."
        });
    }

    try {
        const booking = await Passenger.findOne({ email, referenceNumber });

        if (!booking) {
            return res.status(404).json({
                success,
                message: "Booking not found with this email or reference number."
            });
        }

        const currentTime = new Date();
        const pickupDate = new Date(booking.pickupDate);
        const [pickupHours, pickupMinutes] = booking.pickupTime.split(':').map(Number);        
        pickupDate.setUTCHours(pickupHours, pickupMinutes, 0, 0);        
        const timeDifference = pickupDate - currentTime;
        const hoursDifference = timeDifference / (1000 * 60 * 60); 
        
        let refundAmount = 0;
        let refundStatus = "";

        if (hoursDifference >= 12) {
            const bankFee = 0.05 * booking.fare;
            refundAmount = booking.fare - bankFee;
            refundStatus = `Booking canceled with a bank fee of 5% deducted. Refund amount: £${refundAmount}`;
        } else if (hoursDifference >= 6 && hoursDifference < 12) {
            refundAmount = 0.5 * booking.fare;
            refundStatus = `Booking canceled with a 50% refund. Refund amount: £${refundAmount}`;
        } else if (hoursDifference < 6) {
            return res.status(400).json({
                success: false,
                message: "Booking cannot be canceled within 6 hours of pickup time."
            });
        }

        // Check for session ID (the booking.paymentIntentId holds Checkout Session ID, not Payment Intent ID)
        if (!booking.paymentIntentId) {
            return res.status(400).json({
                success,
                message: "No payment intent found for this booking."
            });
        }

        // Retrieve the Checkout Session
        const session = await stripe.checkout.sessions.retrieve(booking.paymentIntentId);

        // Get the Payment Intent ID from the session
        const paymentIntentId = session.payment_intent;

        // Issue a refund using the Payment Intent ID
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: Math.round(refundAmount * 100),  // Stripe expects amounts in pence/cents
        });

        booking.status = "canceled";
        await booking.save();

        const emailParams = {
            to_email: email,
            reference_number: referenceNumber,
            refund_status: refundStatus,
        };

        try {
            await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, emailParams, process.env.EMAILJS_USER_ID);
        } catch (emailError) {
            console.error('Failed to send email:', emailError.message);
            return res.json({
                success,
                message: "Booking canceled and refund issued, but email could not be sent.",
                refundDetails: refundStatus
            });
        }

        success = true;
        res.json({
            success,
            message: "Booking canceled successfully and refund issued.",
            refundDetails: refundStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { cancelBooking };