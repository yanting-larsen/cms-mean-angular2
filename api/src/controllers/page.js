const Page = require('../models/page');

function load(req, res, next, id) {
    Page.findById(id)
        .exec()
        .then((page) => {
            req.dbPage = page;
            return next();
        }, (err) => next(err));
}

function get(req, res) {
    return res.json(req.dbPage);
}

function create (req, res, next) {
    let parentId = null;
    if (req.body.parentId !== "") {
        parentId = req.body.parentId;
    }

    Page.create({
        name: req.body.name,
        header: req.body.header,
        content: req.body.content,
        position: req.body.position,
        parentId: parentId,
        visible: req.body.visible,
        menu: req.body.menu,
        start: req.body.start
    }).then((savedPage) => {
        return res.json(savedPage);
    }, (err) => next(err));
}

function update(req, res, next) {
    let data = req.body;
    if (req.body.parentId === "") {
        data.parentId = null;
    }

    const page = req.dbPage;
    Object.assign(page, data);

    page.save()
        .then((p) => res.json(p),
              (err) => next(err));
}

function list(req, res, next) {
    Page.find()
        .sort({ sortPath: 1, name: 1 })
        .exec()
        .then((pages) => res.json(pages),
              (err) => next(err));
}


function remove(req, res, next) {
    const page = req.dbPage;
    page.remove()
        .then(() => res.sendStatus(204),
              (err) => next(err));
}

function navigation(req, res, next) {
    Page.find({ menu: true, visible: true })
        .sort({ sortPath: 1, name: 1 })
        .exec()
        .then((pages) => res.json(pages),
              (err) => next(err));
}

function show(req, res, next) {
    const slug = req.query.slug;
    const start = req.query.start;
    let query = {
        visible: true
    }

    if (start) {
        query.start = true;
    } else {
        query.slug = slug;
    }

    Page.findOne(query)
        .then((page) => {
            if (page) {
                return res.json(page);
            } else {
                res.sendStatus(404);
            }
        }, (err) => next(err));
}

module.exports = { load, get, create, update, list, remove, navigation, show };
