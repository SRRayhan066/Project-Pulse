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
    taskStatus: {
        type: String,
        default: "In Progress",
    },
    file: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model('Task', TaskSchema);