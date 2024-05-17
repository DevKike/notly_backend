const moment = require("moment");
const create = require("../service/project.service");
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

module.exports = { createProject, getRemainingDays };
