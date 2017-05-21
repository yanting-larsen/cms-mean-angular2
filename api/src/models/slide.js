const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    extension: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

SlideSchema.pre('validate', function(next) {
    let slide = this;

    if (!slide.isModified('extension')) {
        return next();
    }

    slide.fileName = slide._id + '.' + slide.extension;
    next();
});

module.exports = mongoose.model('Slide', SlideSchema);
