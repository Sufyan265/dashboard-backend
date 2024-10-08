const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assetAllocation: {
        type: [
            {
                name: String,
                value: Number
            }
        ],
        default: []
    },
    totalValue: {
        type: Number,
        required: true
    },
    monthlyData: {
        type: [
            {
                name: String,
                value: Number
            }
        ],
        default: []
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);