import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

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
        expiresIn: process.env.JWT_DURATION
    };

    const secret = process.env.JWT_SECRET;
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

export default { authenticate, generateToken, respondJWT }; 