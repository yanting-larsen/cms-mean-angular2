import Settings from '../models/settings';

function get(req, res) {
    return res.json(req.dbSettings);
}

function update(req, res, next) {
    const settings = req.dbSettings;
    Object.sassign(settings, req.body);

    settings.save()
        .then(() => res.sendStatus(204),
            (err) => next(err));
}

export default { get, update };