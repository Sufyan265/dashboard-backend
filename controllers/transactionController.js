const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });

        if (!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
        }

        const response = transactions.map(transaction => ({
            date: transaction.date.toISOString().split('T')[0],
            type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
            asset: transaction.asset,
            quantity: transaction.quantity,
            price: transaction.price,
            total: transaction.total,
            fees: transaction.fees
        }));

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};