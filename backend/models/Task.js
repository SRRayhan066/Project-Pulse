const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    projectName: {
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

module.exports = mongoose.model('Task', TaskSchema);