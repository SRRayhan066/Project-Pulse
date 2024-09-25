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

//Get All users
const getAllUsers = async (req, res, next) => {
    try {
        // Find all users, exclude the password field
        const users = await User.find();
        
        // If no users are found, you can throw an error (optional)
        if (!users || users.length === 0) {
            const error = new Error("No users found");
            error.status = 400;
            throw error;
        }

        // Send the list of users as the response
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


// update user role by email
const updateUserRole = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, { role: req.body.role }, { new: true }).select('-password');
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        } else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        next(error);
    }
}

// export
module.exports = { getUserByEmail, updateUserRole, getAllUsers };