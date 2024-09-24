// external imports
const express = require('express');

// internal imports
const Comment = require('../models/Comment');

// create new comment
const createComment = async (req, res, next) => {
    try {
        const comment = new Comment({
            projectName: req.body.projectName,
            userEmail: req.body.userEmail,
            comment: req.body.comment
        });
        const newComment = await Comment.create(comment);
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

// get all comments of a project
const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ projectName: req.params.projectName });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

// export
module.exports = { createComment, getComments };