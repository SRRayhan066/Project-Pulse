// external imports
const express = require('express');

// internal imports
const { createComment, getComments } = require('../controllers/commentController');

const commentRouter = express.Router();

// create comment
commentRouter.post('/create', createComment);

// get all comments of a project
commentRouter.get('/all/:projectName', getComments);

module.exports = commentRouter;