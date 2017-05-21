const express = require('express');

const adminRoutes = require('./admins');
const navigationRoutes = require('./navigation');
const pageRoutes = require('./pages');
const settingsRoutes = require('./settings');
const slideRoutes = require('./slides');
const authRoutes = require('./auth');

const router = express.Router();

router.get('/status', (req, res) =>
           res.json({
               status: "ok"
           })
          );

router.use('/admins', adminRoutes);
router.use('/navigation', navigationRoutes);
router.use('/pages', pageRoutes);
router.use('/settings', settingsRoutes);
router.use('/slides', slideRoutes);
router.use('/auth', authRoutes);

module.exports = router;
