const moment = require("moment");
const { create, findAllProjectsById, findProjectById, update } = require("../service/project.service");
const { findEmployeeById } = require("../../employee/service/employee.service");

const createProject = async (projectData) => {
  try {
    const employee = await findEmployeeById(projectData.employeeId);

    const companyId = employee.dataValues.companyId;

    const newProjectData = { ...projectData, companyId };
    
    return await create(newProjectData);
  } catch (error) {
    throw error;
  }
};

const getProject = async (projectId) => {
  try {
    return await findProjectById(projectId);
  } catch(error) {
    throw error;
  }
}

const getProjects = async (employeeId) => {
  try {
    const employee = await findEmployeeById(employeeId);

    const companyId = employee.dataValues.companyId;
  
    return await findAllProjectsById(companyId);
  } catch (error) {
    throw error;
  }
};

const updateProject = async (employeeId, projectId, projectData) => {
  try {
    const employee = await findEmployeeById(employeeId);
    const project = await findProjectById(projectId);
    
    const employeeCompanyId = employee.dataValues.companyId;
    const projectCompanyId = project.dataValues.companyId;

    if (employeeCompanyId !== projectCompanyId) {
      throw new Error("Insufficient permissions");
    }

    const updatedProjectData = { id: projectId, ...projectData };
    
    return await update(updatedProjectData);
  } catch (error) {
    throw error;
  }
}

const getRemainingDays = async (startDate, endDate) => {
  try {
    const start = moment(startDate);
    const end = moment(endDate);

    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();

    return days;
  } catch (error) {
    throw error;
  }
};

module.exports = { createProject, getProject, getProjects, updateProject, getRemainingDays };
