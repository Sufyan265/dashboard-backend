const express = require('express');
const { getAnnualReport } = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:year', authMiddleware, getAnnualReport);

module.exports = router;
