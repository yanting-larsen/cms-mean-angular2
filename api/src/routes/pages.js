const express = require('express');
const pageCtrl = require('../controllers/page');
const auth = require('../middlewares/jwt');

const router = express.Router();

router.route('/')
    // GET /api/pages - Get list of pages
    .get(auth, pageCtrl.list)
    // POST /api/pages -Create new task
    .post(auth, pageCtrl.create);

router.route('/navigation')
    // GET /api/pages/navigation - Get pages for navigation
    .get(pageCtrl.navigation);

router.route('/show')
    // GET /api/pages/show - Get a single page for show
    .get(pageCtrl.show);

router.route('/:pageId')
    // GET /api/pages/:pageId - Get page
    .get(auth, pageCtrl.get)
    // PUT /api/pages/:pageID - update page
    .put(auth, pageCtrl.update)
    // DELETE /api/pages/:pageId - Delete page
    .delete(auth, pageCtrl.remove);

// Load page when API with pageId route parameter is hit
router.param('pageId', pageCtrl.load);

module.exports = router;
