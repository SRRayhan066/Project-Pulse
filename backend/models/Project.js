 const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    allowedUsers: {
        type: Array,
        default: [],
    },
    projectManagerEmail: {
        type: String,
        required: true,
    },
    projectManagerName: {
        type: String,
    },
    projectStatus: {
        type: String,
        default: "Ongoing",
    }
});

module.exports = mongoose.model('Project', ProjectSchema);

