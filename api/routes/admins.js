import express from 'express';
import adminCtrl from '../controllers/admin';
import auth from '../middlewares/jwt';

const router = express.Router();

router.route('/')
    .get(auth, adminCtrl.list)
    .post(auth, adminCtrl.create);

router.route('/:adminId')
    .get(auth, adminCtrl.get)
    .put(auth, adminCtrl.update)
    .delete(auth, adminCtrl.remove);

router.param('adminId', adminCtrl.load);

export default router;