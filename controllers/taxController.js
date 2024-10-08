const TaxDocument = require('../models/TaxDocument');

exports.getTaxDocuments = async (req, res) => {
    try {
        const taxDocuments = await TaxDocument.find({ userId: req.user.id });
        res.json(taxDocuments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
