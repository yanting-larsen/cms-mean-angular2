import express from 'express';
import authCtrl from '../controllers/auth';

const router = express.Router();

router.route('/')
    /** POST /api/auth Get JWT authentication token */
    .post(authCtrl.authenticate,
        authCtrl.generateToken,
        authCtrl.respondJWT);

export default router;