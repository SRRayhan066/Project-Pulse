// external imports
const express = require('express');

// internal imports
const User = require('../models/User');

// get a user by email
const getUserByEmail = async (req, res, next) => {
    try {
        // don't send password
        const user = await User.findOne({ email: req.params.email }, { password: 0 });
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}

// export
module.exports = { getUserByEmail };