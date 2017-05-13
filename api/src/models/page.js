const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    header: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: Number,
        default: 0
    },
    visible: {
        type: Boolean,
        default: true
    },
    menu: {
        type: Boolean,
        default: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    path: {
        type: String
    }
});

PageSchema.pre('save', function(next) {
    let page = this;

    if (!page.isModified('parentId')) {
        return next();
    }

    if (!page.parentId) {
        page.path = '/' + page._id;
        next();
    } else {
        page.constructor.findById(page.parentId)
            .exec()
            .then((parent) => {
                page.path = parent.path + '/' + page._id;
                next();
            }).catch((err) => {
                next(err);
            });
    }
});

module.exports = mongoose.model('Page', PageSchema);
