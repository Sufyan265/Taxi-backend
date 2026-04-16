# Airport Taxi Backend API

### Production-Oriented Booking, Fare, and Payment API for Airport Transfer Operations

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19.2-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Driver_6.8.0-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.5.3-880000?logo=mongoose&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-16.8.0-635BFF?logo=stripe&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7.4-5A29E4)
![dotenv](https://img.shields.io/badge/dotenv-16.4.5-ECD53F)
![CORS](https://img.shields.io/badge/CORS-enabled-0052CC)

## Tech Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Runtime | Node.js | 18+ recommended |
| Framework | Express | 4.19.2 |
| Database | MongoDB + Mongoose | mongodb 6.8.0, mongoose 8.5.3 |
| Payments | Stripe | 16.8.0 |
| External APIs | Google Distance Matrix + HERE autocomplete | via Axios |
| Config | dotenv | 16.4.5 |
| Cross-Origin Access | cors | 2.8.5 |
| Logging | File-based request/error logs | logs/server.log |

## Key Features

- Distance-aware fare calculation endpoint for booking quotes.
- Passenger booking creation with generated booking reference number.
- Booking management lookup endpoint (email + reference).
- Cancellation workflow with tiered refund logic and Stripe refund integration.
- Stripe Checkout session creation endpoint for frontend payment handoff.
- Address suggestion endpoint powered by HERE API.
- MongoDB-backed persistence through Mongoose models.

## Project Structure

```text
Taxi Backend/
├── package.json
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── calculateFare.js
│   ├── PassengerOrder.js
│   ├── manageBooking.js
│   ├── cancelBooking.js
│   └── suggestions.js
├── routes/
│   ├── Routes.js
│   └── paymentGetway.js
├── services/
│   └── distanceService.js
├── models/
│   ├── Passenger.js
│   └── Booking.js
└── logs/
    └── server.log
```

## Getting Started

### 1) Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)
- Stripe secret key
- Google Maps Distance Matrix API key
- HERE API key
- EmailJS credentials (for cancellation email flow)

### 2) Installation

```bash
cd "Taxi Backend"
npm install
```

### 3) Environment Variable Setup

Create a `.env` file in `Taxi Backend`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority

GOOGLE_API_KEY=your_google_api_key
HERE_API_KEY=your_here_api_key

STRIPE_SECRET_KEY=sk_test_xxx
CLIENT_URL=http://localhost:3000

EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id
```

### 4) Run the Development Server

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

Default local API base URL:
- `http://localhost:5000`

Health check:
- `GET /`

## Usage

### API Route Groups

- `/api/*` for booking/fare/management operations
- `/payment/*` for Stripe checkout session creation

### Core Endpoints

- `POST /api/calculate-fare`
- `POST /api/passenger`
- `POST /api/suggestions`
- `POST /api/manageBooking`
- `POST /api/cancelBooking`
- `POST /payment/create-checkout-session`

### Example Requests

Calculate fare:

```bash
curl -X POST http://localhost:5000/api/calculate-fare \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Birmingham Airport",
    "destination": "Coventry",
    "pickupDate": "2026-04-20",
    "pickupTime": "14:30",
    "tripType": "oneWay",
    "passengers": "2",
    "luggage": "2"
  }'
```

Create Stripe checkout session:

```bash
curl -X POST http://localhost:5000/payment/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 4500,
    "currency": "gbp",
    "title": "Airport Taxi Booking",
    "description": "One-way airport transfer",
    "email": "customer@example.com"
  }'
```

Manage booking lookup:

```bash
curl -X POST http://localhost:5000/api/manageBooking \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "referenceNumber": "BAT123456"
  }'
```

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a focused feature branch.
3. Add or update tests for controller and route behavior.
4. Submit a pull request with implementation rationale and validation details.

Recommended engineering standards:
- Validate request payloads at route boundaries.
- Keep secrets in environment variables only.
- Restrict CORS origins in production.
- Add automated tests for payments and cancellation/refund paths.

## License

Current backend package metadata lists `ISC`.
If you want a repository-wide license policy, add a root license file and align this section accordingly.
