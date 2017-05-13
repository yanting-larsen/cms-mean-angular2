const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Slide', SlideSchema);
