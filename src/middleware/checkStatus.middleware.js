const { findEmployeeById } = require("../modules/employee/service/employee.service");

const checkActiveStatus = () => {
  return async (req, res, next) => {
    try {
      const employeeId = req.employee;

      const employee = await findEmployeeById(employeeId);

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      if (!employee.dataValues.active) {
        return res.status(403).json({
          message: "Access denied: Insufficient permissions",
        });
      }

      next();
    } catch (error) {
      res.status(403).json({
        error: "Authorization denied",
      });
    }
  };
};

module.exports = checkActiveStatus;
