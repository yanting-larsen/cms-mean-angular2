import mongoose from 'mongoose';

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
        default:0 
    },
    path: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pages'
    },
    visible: {
        type: Boolean,
        default: true
    },
    menu: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Page', PageSchema);