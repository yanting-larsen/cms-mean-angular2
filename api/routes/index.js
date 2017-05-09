import express from 'express';
import adminRoutes from './admins';
import pageRoutes from './pages';
import settingsRoutes from './settings';
import slideRoutes from './slides';
import authRoutes from './auth';

const router = express.Router();

router.get('/status', (req, res) => 
    res.json({
        status: "ok"
    })
);

router.use('/admins', adminRoutes);
router.use('/pages', pageRoutes);
router.use('/settings', settingsRoutes);
router.use('/slides', slideRoutes);
router.use('/auth', authRoutes);

export default router;