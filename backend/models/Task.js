const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    projectID: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
    },
    status: {
        type: String,
        default: "In Progress",
    }
});