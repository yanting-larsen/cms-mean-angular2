const Settings = require('../models/settings');

function load(req, res, next) {
    Settings.findOne()
        .then((settings) => {
            if (settings) {
                req.dbSettings = settings;
                return next();
            } else {
                Settings.create({})
                    .then((newSettings) => {
                        req.dbSettings = newSettings;
                        return next();
                    }, (err) => next(err));
            }
        }, (err) => next(err));
}

function get(req, res, next) {
    return res.json(req.dbSettings);
}

function update(req, res, next) {
    const settings = req.dbSettings;
    Object.assign(settings, req.body);

    settings.save()
        .then(() => res.sendStatus(204),
              (err) => next(err));
}

module.exports = { load, get, update };
