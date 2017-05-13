const config = require('config');
const mongoose = require('mongoose');
const async = require('async');

const initDb = require('../db');
initDb(db => {
    db.on('error', (err) => {
        console.log(err);
        process.exit(1);
    });

    db.on('connected', () => {
        console.log("Database connection is ready");
    });
});

const Admin = require('../models/admin');

module.exports.seed = function() {
    console.log('Seeding database...');

    return Admin.findOne({ userName: config.defaultAdmin.userName }).then(admin => {
        if (!admin) {
            console.log('Creating default admin...');
            Admin.create({
                fullName: "Super Admin",
                userName: config.defaultAdmin.userName,
                password: config.defaultAdmin.password
            }).then(() => {
                console.log("DONE!");
            });
        } else {
            console.log('Default admin already exists.');
        }
    });
};

module.exports.clear = function(callback) {
    const fns = [];

    function createAsyncFn(index) {
        fns.push((done) => {
            mongoose.connection.collections[index].remove(() => {
                done();
            });
        });
    }

    for (const i in mongoose.connection.collections) {
        if (mongoose.connection.collections.hasOwnProperty(i)) {
            createAsyncFn(i);
        }
    }

    async.parallel(fns, () => callback());
};
