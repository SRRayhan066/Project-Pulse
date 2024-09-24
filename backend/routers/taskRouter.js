// external imports
const express = require('express');

// internal imports
const { createTask, updateTaskStatus, uploadTaskFile, deleteTask, getTasks } = require('../controllers/taskController');

const taskRouter = express.Router();

// create task
taskRouter.post('/create', createTask);

// update task status
taskRouter.patch('/update/status/:taskName', updateTaskStatus);

// delete task
taskRouter.delete('/delete/:taskName', deleteTask);

// get all tasks of a project
taskRouter.get('/all/:projectName', getTasks);

// upload task file
taskRouter.patch('/upload/:taskName', uploadTaskFile);

module.exports = taskRouter;