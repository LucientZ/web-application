const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    fieldname: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    buffer: {
        data:Buffer,
        contentType: String
    }
}, {timestamps: true});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;