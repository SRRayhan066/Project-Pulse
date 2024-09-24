const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
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