// external imports
const express = require('express');

// internal imports
const { createProject, updateProjectStatus, deleteProject, getProjects } = require('../controllers/projectController');


const projectRouter = express.Router();

// create project
projectRouter.post('/create', createProject);

// update project status
projectRouter.patch('/update/status/:projectName', updateProjectStatus);

// delete project
projectRouter.delete('/delete/:projectName', deleteProject);

// get all projects
projectRouter.get('/all', getProjects);

module.exports = projectRouter;