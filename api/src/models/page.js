const mongoose = require('mongoose');

slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

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
    visible: {
        type: Boolean,
        default: true
    },
    menu: {
        type: Boolean,
        default: true
    },
    start: {
        type: Boolean,
        default: false
    },
    position: {
        type: Number,
        default: 0
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    path: {
        type: String,
        index: true
    },
    sortPath: {
        type: String,
        index: true
    },
    slug: {
        type: String,
        index: true,
        unique: true
    }
});
PageSchema.index({ sortPath: 1, name: 1 }, { unique: true });

PageSchema.pre('save', function(next) {
    let page = this;

    if (!page.isModified('parentId') && !page.isModified('position')) {
        return next();
    }

    if (!page.parentId) {
        page.path = '/' + page._id;
        page.sortPath = '/' + page.position;
        page.slug = '/' + slugify(page.name);

        next();
    } else {
        page.constructor.findById(page.parentId)
            .exec()
            .then((parent) => {
                page.path = parent.path + '/' + page._id;
                page.sortPath = parent.sortPath + '/' + page.position;
                page.slug = parent.slug + '/' + slugify(page.name);

                next();
            }).catch((err) => {
                next(err);
            });
    }
});

module.exports = mongoose.model('Page', PageSchema);
