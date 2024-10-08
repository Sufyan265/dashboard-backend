const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const TaxDocument = require('../models/TaxDocument');
const User = require('../models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
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
                type: 'buy',
                amount: 1000,
                date: new Date('2024-09-01'),
                asset: 'AAPL',
                quantity: 10,
                price: 150,
                total: 1500,
                fees: 5
            },
            {
                userId: savedUser._id,
                type: 'sell',
                amount: 500,
                date: new Date('2024-08-20'),
                asset: 'GOOG',
                quantity: 5,
                price: 1200,
                total: 6000,
                fees: 15
            },
            {
                userId: savedUser._id,
                type: 'sell',
                amount: 500,
                date: new Date('2024-07-20'),
                asset: 'TSLA',
                quantity: 2,
                price: 200,
                total: 400,
                fees: 2
            }
        ];

        const taxDocuments = [
            {
                userId: savedUser._id,
                year: 2024,
                documentURL: 'tax_form_2024.pdf',
            },
        ];

        await Portfolio.deleteMany();
        await Transaction.deleteMany();
        await TaxDocument.deleteMany();

        await Portfolio.insertMany(portfolios);
        await Transaction.insertMany(transactions);
        await TaxDocument.insertMany(taxDocuments);

        console.log('Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();