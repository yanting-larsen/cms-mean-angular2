import jwt from 'express-jwt';

const authenticate = jwt({
    secret: process.env.JWT_SECRET
});

export default authenticate;