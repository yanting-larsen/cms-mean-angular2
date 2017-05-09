import Slide from '../models/slide';

function load(req, res, next, id) {
    slide.findById(id)
    .exec()
    .then((slide) => {
        req.dbSlide = slide;
        return next();
    }, (err) => next(err));
}

function get(req, res) {
    return res.json(req.dbSlide);
} 

function create(req, res, next) {
    slide.create({
        image: req.body.image,
        position: req.body.position
    })
    .then((savedSlide) => {
        return res.json(savedSlide);
    }, (err) => next(err));
}

function update(req, res, next) {
    const slide = req.dbSlide;
    Object.assign(slide, req.body);

    slide.save()
        .then(() => res.sendStatus(204),
            (err) => next(err));
}

function list(req, res, next) {
    Slide.find()
        .exec()
        .then((slides) => res.json(slides),
            (err) => next(err));
}

function remove(req, res, next) {
    const side = req.dbSlide;
    slide.remove()
        .then(() => res.sendStatus(204),
            (err) => next(err));
}

export default { load, get, create, update, list, remove };