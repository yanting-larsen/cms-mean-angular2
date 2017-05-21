const Page = require('../models/page');

function list(req, res, next) {
    Page.find({ menu: true, visible: true })
        .sort({ sortPath: 1, name: 1 })
        .exec()
        .then((pages) => res.json(pages),
              (err) => next(err));
}

module.exports = { list };
