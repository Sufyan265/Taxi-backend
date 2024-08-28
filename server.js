const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Routes = require('./routes/Routes');
const paymentGetway = require('./routes/paymentGetway');

dotenv.config();

connectDB();

const app = express();

// Log file path
const logFilePath = path.join(__dirname, 'logs', 'server.log');

// Ensure log directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Middleware to log requests
app.use((req, res, next) => {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('Failed to write to log file:', err);
    });
    next();
});

// Configure CORS to allow requests from the specified origin
// app.use(cors({
//     origin: 'https://birminghamairporttaxicab.co.uk'
// }));
app.use(cors());

app.use(express.json());

app.use('/api', Routes);
app.use('/payment', paymentGetway);

app.get('/', (req, res) => {
    res.json({ message: 'The server is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const errorMessage = `${new Date().toISOString()} - Error: ${err.message}\n`;
    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) console.error('Failed to write to log file:', err);
    });
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});