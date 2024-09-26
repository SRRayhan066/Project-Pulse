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
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
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