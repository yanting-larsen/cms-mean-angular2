const express = require('express');

const settingsCtl = require('../controllers/settings');
const auth = require('../middlewares/jwt');

const router = express.Router();

router.route('/')
    // GET /api/settings - Get settings
    .get(settingsCtl.load, settingsCtl.get)
// PUT /api/settings - put settings
    .put(auth, settingsCtl.load, settingsCtl.update);

module.exports = router;
