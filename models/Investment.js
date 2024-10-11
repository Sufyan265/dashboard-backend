const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    performanceMetrics: {
        growth: {
            type: Number,
            default: 0,
        },
        losses: {
            type: Number,
            default: 0,
        },
        profit: {
            type: Number,
            default: 0,
        },
    },
}, { timestamps: true });

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
