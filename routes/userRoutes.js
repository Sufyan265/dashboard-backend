const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the auth
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUserData); // Add the new route with auth middleware

// KYC routes
// router.post('/kyc/upload', upload.single('kycDocument'), uploadKycDocument);
// router.put('/kyc/approve/:userId', approveKyc);
// router.put('/kyc/reject/:userId', rejectKyc);

module.exports = router;