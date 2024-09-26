// external imports
const express = require('express');

// internal imports
const { getUserByEmail, updateUserRole, getAllUsers, updateUserWorkingStatus, getNotWorkingUsers } = require('../controllers/profileController');

const profileRouter = express.Router();

profileRouter.get('/:role', getAllUsers);

// get all users that are not working
profileRouter.get('/not/working', getNotWorkingUsers);

// get user by email
profileRouter.get('/user/:email', getUserByEmail);

// update user role by email
profileRouter.patch('/:email', updateUserRole);

// update user working status by email
profileRouter.patch('/working/:email', updateUserWorkingStatus);

module.exports = profileRouter;