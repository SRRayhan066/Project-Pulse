 const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: {
        type: Array,
        default: [],
    },
    projectManagerEmail: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Ongoing",
    }
});

module.exports = mongoose.model('Project', ProjectSchema);

