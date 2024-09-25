// external imports
const express = require('express');

// internal imports
const { getUserByEmail, updateUserRole } = require('../controllers/profileController');

const profileRouter = express.Router();

// get user by email
profileRouter.get('/:email', getUserByEmail);

// update user role by email
profileRouter.patch('/:email', updateUserRole);

module.exports = profileRouter;