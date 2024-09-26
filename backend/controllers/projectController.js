
// internal imports
const Project = require("../models/Project");

// create new project
const createProject = async (req, res, next) => {
  try {
    const project = new Project({
            projectName: req.body.projectName,
            projectManagerEmail: req.body.projectManagerEmail,
            projectManagerName: req.body.projectManagerName,
            projectStatus: req.body.projectStatus
        });
    const newProject = await Project.create(project);
    res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

// update project (update project status)
const updateProjectStatus = async (req, res, next) => {
    try {
        const project = await Project.findOne({ projectName: req.params.projectName });
        if (project) {
            project.projectStatus = req.body.projectStatus;
            const updatedProject = await project.save();
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: "Project not found." });
        }
    } catch (error) {
        next(error);
    }
}

// delete project
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findOne({ projectName: req.params.projectName });
        if (project) {
            await project.deleteOne();
            res.status(200).json({ message: "Project deleted." });
        } else {
            res.status(404).json({ message: "Project not found." });
        }
    } catch (error) {
        next(error);
    }
}

// get all projects
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

// export
module.exports = {
    createProject,
    updateProjectStatus,
    deleteProject,
    getProjects,
};