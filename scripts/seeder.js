const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const TaxDocument = require('../models/TaxDocument');
const Investment = require('../models/Investment');
const User = require('../models/User');

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();
        const savedUser = await User.findOne({ email: 'suficontact265@gmail.com' });

        const portfolios = [
            {
                userId: savedUser._id,
                assetAllocation: [
                    { name: 'Stocks', value: 10000 },
                    { name: 'Bonds', value: 5000 },
                    { name: 'Real Estate', value: 6000 },
                ],
                totalValue: 21000,
                monthlyData: [
                    { name: 'Jan', value: 50 },
                    { name: 'Feb', value: 300 },
                    { name: 'Mar', value: 200 },
                    { name: 'Apr', value: 278 },
                    { name: 'May', value: 189 },
                ]
            },
        ];

        const transactions = [
            {
                userId: savedUser._id,
                amount: 1000,
                date: new Date('2024-09-01'),
            },
            {
                userId: savedUser._id,
                amount: 500,
                date: new Date('2024-08-20'),
            },
            {
                userId: savedUser._id,
                amount: 500,
                date: new Date('2024-07-20'),
            }
        ];

        const taxDocuments = [
            {
                userId: savedUser._id,
                year: 2024,
                documentURL: 'tax_form_2024.pdf',
            },
        ];

        const investments = [
            {
                date: new Date('2024-01-01'),
                type: 'AAPL',
                amount: 1500,
                performanceMetrics: {
                    growth: 10,
                    losses: 0,
                    profit: 5,
                },
            },
            {
                date: new Date('2024-02-01'),
                type: 'GOOGL',
                amount: 2000,
                performanceMetrics: {
                    growth: 15,
                    losses: 0,
                    profit: 7.5,
                },
            },
        ];

        await Portfolio.deleteOne({ userId: savedUser._id });
        await Transaction.deleteOne({ userId: savedUser._id });
        await TaxDocument.deleteOne({ userId: savedUser._id });
        await Investment.deleteOne({});

        await Portfolio.insertMany(portfolios);
        await Transaction.insertMany(transactions);
        await TaxDocument.insertMany(taxDocuments);
        await Investment.insertMany(investments);

        console.log('Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();