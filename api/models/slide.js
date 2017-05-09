import mongoose from 'mongoose';

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

export default mongoose.model('Slide', SlideSchema);