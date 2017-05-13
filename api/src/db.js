const config = require('config');
const mongoose = require('mongoose');

module.exports = callback => {
    mongoose.Promise = Promise;
    mongoose.connect(config.db.uri);
    const db = mongoose.connection;

    callback(db);
}
