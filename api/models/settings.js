import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
},
    footer: {
        type: String,
        required: true,
        trim: true
    } 
});

export default mongoose.model('Settings', SettingsSchema);
