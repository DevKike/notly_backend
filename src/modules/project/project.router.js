const express = require("express");
const { createProject, getProjects, updateProject } = require("./controller/project.controller");
const authToken = require("../../middleware/authToken.middleware");
const checkActiveStatus = require("../../middleware/checkActiveStatus.middleware");
const verifyRole = require("../../middleware/verifyRole.middleware");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const createSchema = require("./schema/project.schema");

const projectRouter = express.Router();

projectRouter.post("/create", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), schemaValidator(createSchema), async (req, res) => {
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

projectRouter.get("/get/all", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), async (req, res) => {
  try {
    const employeeId = req.employee;

    await getProjects(employeeId);
    res.status(200).json({
      message: "Projects were sucessfully obtained",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

projectRouter.patch("/update", authToken(), checkActiveStatus(), verifyRole("Director", "Assistant manager", "Project manager"), async (req, res) => {
  try {
    const { projectId, projectData } = req.body 
    const employeeId = req.employee;

    await updateProject(projectId, projectData, employeeId);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = projectRouter;
