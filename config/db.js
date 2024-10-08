const mongoose = require('mongoose');
const logger = require('../logs/logger'); // Import the logger

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected');
        console.log(`MongoDB connected`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;