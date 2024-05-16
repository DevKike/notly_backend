const { findEmployeeById } = require("../modules/employee/service/employee.service");

const checkEmployeeStatus = () => {
  return (req, res, next) => {
    try {
      const employeeId = req.user;

      const employee = findEmployeeById(employeeId);

      console.log(employee);

    } catch (error) {
      res.status(403).json({
        message: "Access denied",
      });
    }
  };
};

module.exports = checkEmployeeStatus;
