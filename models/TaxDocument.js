const mongoose = require('mongoose');

const TaxDocumentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    year: { type: Number, required: true },
    documentURL: { type: String, required: true },
});

module.exports = mongoose.model('TaxDocument', TaxDocumentSchema);
