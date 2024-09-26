const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    userID: { // Add this if userID is needed
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique ID
    },
    working: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('User', UserSchema);