const config = require('config');
const jwt = require('express-jwt');

const authenticate = jwt({
    secret: config.jwt.secret
});

module.exports = authenticate;
