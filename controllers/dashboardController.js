const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');

exports.getDashboardOverview = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.user.id });
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }).limit(5);
        res.json({ portfolio, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
