import express from 'express';
import pageCtrl from '../controllers/page';
import auth from '../middlewares/jwt';

const router = express.Router();

router.route('/')
    // GET /api/pages - Get list of pages
    .get(pageCtrl.list)

    // POST /api/pages -Create new task 
    .post(auth, pageCtrl.create);

router.route('/:pageId')
    // GET /api/pages/:pageId - Get page
    .get(pageCtrl.get)
    // PUT /api/pages/:pageID - update page
    .put(auth, pageCtrl.update)
    // DELETE /api/pages/:pageId - Delete page
    .delete(auth, pageCtrl.remove);

// Load page when API with pageId route parameter is hit
router.param('pageId', pageCtrl.load);

export default router;