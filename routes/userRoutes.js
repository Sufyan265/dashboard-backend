const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
// const { upload, uploadKycDocument, approveKyc, rejectKyc } = require('../controllers/kycController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// KYC routes
// router.post('/kyc/upload', upload.single('kycDocument'), uploadKycDocument);
// router.put('/kyc/approve/:userId', approveKyc);
// router.put('/kyc/reject/:userId', rejectKyc);

module.exports = router;