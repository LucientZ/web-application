const mongoose = require('mongoose');

const imagePostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    attachmentId: {
        type: String,
        required: true
    },
    attachmentName: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ImagePost = mongoose.model('ImagePost', creationSchema);
module.exports = ImagePost;