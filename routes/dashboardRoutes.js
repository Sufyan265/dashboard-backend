const express = require('express');
const { getDashboardOverview } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getDashboardOverview);

module.exports = router;
