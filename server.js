const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const taxRoutes = require('./routes/taxRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const rateLimiter = require('./middlewares/rateLimiter');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const { initSocket } = require('./utils/socketManager');
const logger = require('./logs/logger'); // Import the logger

connectDB();
const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: 'http://dashboard.cephas.agency', // Allow requests from this origin
    credentials: true // Allow cookies to be sent
}));

// const allowedOrigins = ['http://localhost:5173', 'http://dashboard.cephas.agency'];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true // Allow cookies to be sent
// }));


app.use(morgan('dev', { stream: { write: message => logger.info(message.trim()) } })); // Use logger for HTTP requests
app.use(rateLimiter);

app.use('/api/users', userRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: 'The server is working' });
});


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`)); // Use logger for server start

initSocket(server);