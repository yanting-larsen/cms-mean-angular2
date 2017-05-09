import express from 'express';
import slideCtrl from '../controllers/slide';
import auth from '../middlewares/jwt';

const router = express.Router();

router.route('/')
    // GET /api/slides - Get list of slides
    .get(slideCtrl.list) 
    // POST /api/slides - Create new slide
    .post(auth, slideCtrl.create);

router.route('/:slideId')
    // GET /api/slides/:slideId - Get slide
    .get(auth, slideCtrl.get)
    // PUT /api/slides/:slideId - Update slide
    .put(auth, slideCtrl.update)
    // DELETE /api/slides/:slideId - Delete slide
    .delete(auth, slideCtrl.remove);

// Load slide when API with slideId route parameter is hit
router.param('slideId', slideCtrl.load);

export default router;