const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
        type: String,
        enum: ['buy', 'sell'], 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    asset: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);