const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    projectID: {
        type: String,
        required: true,
    },
    taskID: {
        type: String,
        required: true,
    },
    UserID: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Comment', CommentSchema);