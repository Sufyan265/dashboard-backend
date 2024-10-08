const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    year: { type: Number, required: true },
    summary: { type: String, required: true },
});

module.exports = mongoose.model('Report', ReportSchema);
