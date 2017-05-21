const fs = require("fs");
const fileType = require('file-type');
const Slide = require('../models/slide');

function writeSlideFile(fileName, buffer) {
    const path = "media/uploads/" + fileName;

    fs.writeFile(path, buffer, (err) => {
        if (err) throw err;
        console.log('Saved file: ' + path);
    });
}

function removeSlideFile(fileName) {
    const path = 'media/uploads/' + fileName;

    fs.unlink(path, () => {
        console.log('Deleted file: ' + path);
    });
}

function load(req, res, next, id) {
    Slide.findById(id)
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
    if (!req.body.image) {
        return res.sendStatus(400);
    }

    const buffer = new Buffer(req.body.image, "base64");
    const metaData = fileType(buffer);

    Slide.create({
            extension: metaData.ext,
            mimeType: metaData.mime,
            position: req.body.position
        }).then((savedSlide) => {
            writeSlideFile(savedSlide.fileName, buffer);
            return res.json(savedSlide);
        }, (err) => next(err));
}

function update(req, res, next) {
    let slide = req.dbSlide;
    slide.position = req.body.position;

    slide.save()
        .then((s) => res.json(s),
              (err) => next(err));
}

function list(req, res, next) {
    Slide.find()
        .sort({ position: 1 })
        .exec()
        .then((slides) => res.json(slides),
              (err) => next(err));
}

function remove(req, res, next) {
    const slide = req.dbSlide;
    slide.remove()
        .then(() => {
            removeSlideFile(slide.fileName);
            res.sendStatus(204);
        }, (err) => next(err));
}

module.exports = { load, get, create, update, list, remove };
