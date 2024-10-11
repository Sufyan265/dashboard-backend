const Investment = require('../models/Investment');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');

exports.getDashboardOverview = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.user.id });
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }).limit(5);
        if (!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
        }

        const investments = await Investment.find();
        // console.log(investments);
        if (!investments) {
            return res.status(404).json({ message: 'Investments not found' });
        }

        res.json({ portfolio, transactions, investments });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
