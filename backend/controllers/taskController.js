// external imports
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// internal imports
const Task = require('../models/Task');

// create new task
const createTask = async (req, res, next) => {
    try {
        const task = new Task({
            taskName: req.body.taskName,
            projectName: req.body.projectName,
            assignedTo: req.body.assignedTo,
            taskStatus: req.body.taskStatus
        });
        const newTask = await Task.create(task);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

// update task (update task status & assigned to) both maybe given or only one of them
const updateTaskStatus = async (req, res, next) => {
    try {
        const task = await Task.findOne({ taskName: req.params.taskName });
        if (task) {
            if (req.body.taskStatus) {
                task.taskStatus = req.body.taskStatus;
            }
            if (req.body.assignedTo) {
                task.assignedTo = req.body.assignedTo;
            }
            const updatedTask = await task.save();
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found." });
        }
    }
    catch (error) {
        next(error);
    }
}

// update task (file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('file');


const uploadTaskFile = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            next(err);
        } else {
            try {
                const task = await Task.findOne({ taskName: req.params.taskName });
                if (task) {
                    task.file = req.file.filename;
                    const updatedTask = await task.save();
                    res.status(200).json("File uploaded.");
                } else {
                    res.status(404).json({ message: "Task not found." });
                }
            } catch (error) {
                next(error);
            }
        }
    });
}

// delete task
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ taskName: req.params.taskName });
        if (task) {
            await task.deleteOne();
            res.status(200).json({ message: "Task deleted." });
        } else {
            res.status(404).json({ message: "Task not found." });
        }
    }
    catch (error) {
        next(error);
    }
}

// get all tasks of a project
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ projectName: req.params.projectName });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}

// export
module.exports = {
    createTask,
    updateTaskStatus,
    uploadTaskFile,
    deleteTask,
    getTasks
};