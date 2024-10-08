const Report = require('../models/Report');

exports.getAnnualReport = async (req, res) => {
    try {
        const report = await Report.find({ userId: req.user.id, year: req.params.year });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
