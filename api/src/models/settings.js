const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true,
        default: ""
    },
    footer: {
        type: String,
        trim: true,
        default: ""
    } 
});

module.exports = mongoose.model('Settings', SettingsSchema);
