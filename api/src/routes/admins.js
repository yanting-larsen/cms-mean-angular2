const express = require('express');

const adminCtrl = require('../controllers/admin');
const auth = require('../middlewares/jwt');

const router = express.Router();

router.route('/')
    .get(auth, adminCtrl.list)
    .post(auth, adminCtrl.create);

router.route('/:adminId')
    .get(auth, adminCtrl.get)
    .put(auth, adminCtrl.update)
    .delete(auth, adminCtrl.remove);

router.param('adminId', adminCtrl.load);

module.exports = router;
