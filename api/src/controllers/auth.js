const config = require('config');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

function authenticate(req, res, next) {
    Admin.findOne({
        userName: req.body.userName
    })
        .exec()
        .then((admin) => {
            if (!admin) return next();
            admin.comparePassword(req.body.password, (err, isMatch) => {
                if (err) return next(err);
                if (isMatch) {
                    req.admin = admin;
                    next();
                } else {
                    return next();
                }
            });
        }, (err) => next(err))
}

function generateToken(req, res, next) {
    if (!req.admin) return next();

    const jwtPayload = {
        id: req.admin._id
    };

    const jwtData = {
        expiresIn: config.jwt.duration
    };

    const secret = config.jwt.secret;
    req.token = jwt.sign(jwtPayload, secret, jwtData);

    next();
}

function respondJWT(req, res) {
    if (!req.admin) {
        res.status(401).json({
            error: {
                message: "User name or password is incorrect"
            }
        });
    } else {
        res.status(200).json({
            token: req.token
        });
    }
}

module.exports = { authenticate, generateToken, respondJWT };
