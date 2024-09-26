// external imports
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// internal imports
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// create new task
const createTask = async (req, res, next) => {
    try {
        const newUser = await User.findOne({ email: req.body.assignedTo });
        if (!newUser) {
            return res.status(404).json({ message: "User not found." });
        }
        // task has assignedTo email and name
        const task = {
            taskName: req.body.taskName,
            projectName: req.body.projectName,
            assignedTo: { name: newUser.name, email: newUser.email },
            taskStatus: req.body.taskStatus,
        };

        const newTask = await Task.create(task);

        // assign assignedTo email and name to the project
        const project = await Project.findOne({ projectName: req.body.projectName });
        const user = await User.findOne({ email: req.body.assignedTo });
        if (user) {
            project.allowedUsers.push({ name: user.name, email: user.email });
            await project.save();
        } else {
            res.status(404).json({ message: "User not found." });
        }

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
                // delete assignedTo from project allowedUsers.
                const project = await Project.findOne({ projectName: task.projectName });
                task.assignedTo.forEach(assignedUser => {
                    const index = project.allowedUsers.findIndex(user => user.email.toLowerCase() === assignedUser.email.toLowerCase());
                    if (index > -1) {
                        project.allowedUsers.splice(index, 1);
                        //console.log(`User ${assignedUser.email} removed successfully`);
                    } else {
                        //console.log(`User ${assignedUser.email} not found in allowedUsers`);
                    }
                });
                await project.save();

                const user = await User.findOne({ email: req.body.assignedTo });
                if (user) {
                    project.allowedUsers.push({ name: user.name, email: user.email });
                    await project.save();
                } else {
                    res.status(404).json({ message: "User not found." });
                }

                task.assignedTo = { name: user.name, email: user.email };
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
            // delete assignedTo from project allowedUsers.
            const project = await Project.findOne({ projectName: task.projectName });
            task.assignedTo.forEach(assignedUser => {
                const index = project.allowedUsers.findIndex(user => user.email.toLowerCase() === assignedUser.email.toLowerCase());
                if (index > -1) {
                    project.allowedUsers.splice(index, 1);
                    //console.log(`User ${assignedUser.email} removed successfully`);
                } else {
                    //console.log(`User ${assignedUser.email} not found in allowedUsers`);
                }
            });
            await project.save();

            res.status(200).json({ message: "Task deleted." });
        } else {
            res.status(404).json({ message: "Task not found." });
        }

        await task.deleteOne();
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