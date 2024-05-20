const { findEmployeeById } = require("../../employee/service/employee.service");
const { findProjectById } = require("../service/project.service");
const { create, findTaskById } = require("../service/task.service");

const createTask = async (projectId, taskData, employeeId) => {
  try {
    const employee = await findEmployeeById(employeeId);
    const project = await findProjectById(projectId);

    if (!project) {
      throw new Error("Project was not found");
    }
    const employeeCompanyId = employee.dataValues.companyId;
    const projectCompanyId = project.dataValues.companyId;

    if (employeeCompanyId !== projectCompanyId) {
      throw new Error("Insufficient permissions");
    }

    const newTaskData = { ...taskData, projectId, employeeId };

    return await create(newTaskData);
  } catch (error) {
    throw error;
  }
};

const getTask = async (taskId) => {
  try {
    return await findTaskById(taskId);
  } catch (error) {
    throw error;
  }
};

module.exports = { createTask, getTask };
