// external imports
const express = require('express');

// internal imports
const { getUserByEmail } = require('../controllers/profileController');

const profileRouter = express.Router();

// get user by email
profileRouter.get('/:email', getUserByEmail);

module.exports = profileRouter;