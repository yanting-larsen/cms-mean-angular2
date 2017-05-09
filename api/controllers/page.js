import Page from '../models/page';

function load(req, res, next, id) {
    Page.findById(id)
        .exec()
         then((page) => {
            req.dbPage = page;
            return next();
         }, (err) => next(err));
}

function get(req, res) {
    return res.json(req.dbPage);
}

function create (req, res, next) {
    Page.create({
        name: req.body.name,
        header: req.body.header,
        content: req.body.content,
        position: req.body.position,
        path: req.body.path,
        parentId: req.body.parentId,
        visible: req.body.visible,
        menu: req.body.menu
    })
    .then((savedPage) => {
        return res.json(savedPage);
    }, (err) => next(err));
}

function update(req, res, next) {
    const page = req.dbPage;
    Object.assign(page, req.body);

    page.save()
        .then(() => res.sendStatus(204),
            (err) => next(err));
}

function list(req, res, next) {
     Page.find()
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

export default { load, get, create, update, list, remove };