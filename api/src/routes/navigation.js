const express = require('express');
const pageCtrl = require('../controllers/navigation');

const router = express.Router();

router.route('/')
    // GET /api/navigation - Get navigation
    .get(pageCtrl.list)

module.exports = router;
