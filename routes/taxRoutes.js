const express = require('express');
const { getTaxDocuments } = require('../controllers/taxController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getTaxDocuments);

module.exports = router;
