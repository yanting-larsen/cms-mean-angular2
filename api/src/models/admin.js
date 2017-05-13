const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lastLoginTime: {
        type: Number
    }
});

AdminSchema.pre('save', function(next) {
    const admin = this;

    if (!admin.isModified('password')) {
        return next();
    }

    bcrypt.hash(admin.password, null, null, (err, hash) => {
        if (err) return next(err);

        admin.password = hash;
        next();
    });
});

AdminSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

AdminSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) {
            done(err);
        } else {
            done(err, isMatch);
        } 
    });
};

module.exports = mongoose.model('Admin', AdminSchema);
