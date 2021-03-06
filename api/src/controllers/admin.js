const Admin = require('../models/admin');

function load(req, res, next, id) {
    Admin.findById(id)
        .exec()
        .then((admin) => {
            if (!admin) {
                return res.status(404).json({
                    error: {
                        message: "Admin not found"
                    }
                });
            }
            req.dbAdmin = admin;
            return next();
        }, (err) => next(err));
}

function get(req, res) {
    return res.json(req.dbAdmin);
}

function create(req, res, next) {
    Admin.create({
        userName: req.body.userName,
        fullName: req.body.fullName,
        password: req.body.password,
        lastLoginTime: req.body.lastLoginTime
    })
        .then((savedAdmin) => {
            return res.json(savedAdmin);
        }, (err) => next(err));
}

function update(req, res, next) {
    const admin = req.dbAdmin;
    Object.assign(admin, req.body);

    admin.save()
        .then((a) => res.json(a),
              (err) => next(err));
}

function list(req, res, next) {
    Admin.find()
        .exec()
        .then((admins) => res.json(admins),
              (err) => next(err));
}

function remove(req, res, next) {
    const admin = req.dbAdmin;
    admin.remove()
        .then(() => res.sendStatus(204),
              (err) => next(err));
}

module.exports = { load, get, create, update, list, remove };
