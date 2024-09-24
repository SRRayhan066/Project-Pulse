 const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: {
        type: Array,
        default: [],
    },
    projectManagerID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Ongoing",
    }
});

module.exports = mongoose.model('Project', ProjectSchema);

