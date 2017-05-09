import express from 'express';
import settingsCtl from '../controllers/settings';
import auth from '../middlewares/jwt';

const router = express.Router();

router.route('/')
    // GET /api/settings - Get settings
    .get(settingsCtl.get)
    // PUT /api/settings - put settings
    .put(auth, settingsCtl.update);

export default router;