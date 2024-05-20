const express = require("express");
const { createProject, getProjects, updateProject, getProject } = require("./controller/project.controller");
const { createTask, getTask, getAllTasks} = require("./controller/task.controller");
const authToken = require("../../middleware/authToken.middleware");
const checkActiveStatus = require("../../middleware/checkActiveStatus.middleware");
const verifyRole = require("../../middleware/verifyRole.middleware");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { createSchema, updateSchema } = require("./schema/project.schema");
const createTaskSchema = require("./schema/task.schema");

const projectRouter = express.Router();

projectRouter.post("/create", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager"), schemaValidator(createSchema), async (req, res) => {
  try {
    const employeeId = req.employee;

    const projectData = { ...req.body, employeeId };
    await createProject(projectData);

    res.status(201).json({
      message: "Project was successfully created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.get("/:projectId/get", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), async(req, res) => {
  try{
    const { projectId } = req.params;

    const project = await getProject(projectId);

    res.status(200).json({
      message: "Project was successfully obtained",
      project,
    });
  } catch(error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.get("/get/all", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), async (req, res) => {
  try {
    const employeeId = req.employee;

    const projects = await getProjects(employeeId);
    
    res.status(200).json({
      message: "Projects were successfully obtained",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.patch("/update", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), schemaValidator(updateSchema), async (req, res) => {
  try {
    const { projectId, projectData } = req.body;
    const employeeId = req.employee;

    await updateProject(employeeId, projectId, projectData);
    
    res.status(200).json({
      message: "Project was successfully updated"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.post("/:projectId/create/task", authToken(), schemaValidator(createTaskSchema), async (req, res) => {
  try {
    const { projectId } = req.params;
    const taskData = req.body;
    const employeeId = req.employee;

    await createTask(projectId, taskData, employeeId);
    
    res.status(201).json({
      message: "Task was successfully created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.get("/get/task/:taskId", authToken(), async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await getTask(taskId);

    res.status(200).json({
      message: "Task was successfully obtained",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = projectRouter;
