const multer = require('multer');
const User = require('../models/User');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
});

const upload = multer({ storage });

const uploadKycDocument = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.kycDocument = req.file.path;
        user.kycStatus = 'Pending';
        await user.save();

        res.json({ message: 'KYC document uploaded', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const approveKyc = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.kycStatus = 'Approved';
        await user.save();

        res.json({ message: 'KYC Approved', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const rejectKyc = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.kycStatus = 'Rejected';
        await user.save();

        res.json({ message: 'KYC Rejected', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    upload,
    uploadKycDocument,
    approveKyc,
    rejectKyc,
};