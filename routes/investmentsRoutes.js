const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addInvestment, getAllInvestments, editInvestment } = require('../controllers/investmentsController');
const router = express.Router();

router.post('/add', authMiddleware, addInvestment);
router.get('/get', authMiddleware, getAllInvestments);
router.put('/edit/:id', authMiddleware, editInvestment); // Changed to PUT and added :id parameter

module.exports = router;