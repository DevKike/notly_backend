const moment = require("moment");
const { create, findAllProjectsById, findProjectById } = require("../service/project.service");
const { findCompanyById } = require("../../company/service/company.service")
const { findEmployeeById } = require("../../employee/service/employee.service")

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

const getProjects = async (employeeId) => {
  try {
    const employee = await findCompanyById(employeeId);

    const companyId = employee.dataValues.companyId;

    return await findAllProjectsById(companyId);
  } catch (error) {
    throw error;
  }
};

const updateProject = async (companyId, projectId, employeeId) => {
  try {
    const employee = await findEmployeeById(employeeId);
    const project = await findProjectById(projectId);

    const employeecompanyId = employee.dataValues.companyId;
    const projectCompanyId = project.dataValues.companyId;

    if (employeecompanyId != projectCompanyId) {
      throw new Error("Insufficient permissions");
    }

    return await update();
  } catch (error) {
    throw error;
  }
}

const getRemainingDays = async (startDate, endDate) => {
  try {
    const startDate = moment(startDate);
    const endDate = moment(endDate);

    const duration = moment.duration(endDate.diff(startDate));
    const days = duration.asDays();

    return days;
  } catch (error) {
    throw error;
  }
};

module.exports = { createProject, getProjects, updateProject, getRemainingDays };
