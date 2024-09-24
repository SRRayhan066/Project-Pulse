const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Comment', CommentSchema);