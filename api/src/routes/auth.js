const express = require('express');
const authCtrl = require('../controllers/auth');

const router = express.Router();

router.route('/')
    /* POST /api/auth Get JWT authentication token */
    .post(authCtrl.authenticate,
        authCtrl.generateToken,
        authCtrl.respondJWT);

module.exports = router;
