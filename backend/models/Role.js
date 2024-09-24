const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    permissions: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('Role', RoleSchema);