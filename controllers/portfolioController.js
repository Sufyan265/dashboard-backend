const Portfolio = require('../models/Portfolio');

exports.getPortfolio = async (req, res) => {
    try {
        console.log(req.user.id);
        const portfolio = await Portfolio.findOne({ userId: req.user.id });

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const response = {
            userId: req.user.id,
            monthlyData: portfolio.monthlyData,
            assetAllocation: portfolio.assetAllocation,
            totalValue: portfolio.totalValue,
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};