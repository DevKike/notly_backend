const express = require("express");
const { registerEmployee, loginEmployee, getRoles } = require("./controller/employee.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { registerSchema, loginSchema } = require("./schema/employee.schema");

const employeeRouter = express.Router();

employeeRouter.post("/register", schemaValidator(registerSchema), async (req, res) => {
  try {
    const employeeData = req.body;
    await registerEmployee(employeeData);

    res.status(201).json({
      message: "Employee was successfully registered",
    });
  } catch (error) {
    if (error.message === "Email already in use" || error.message === "Role was not found") {
      res.status(400).json({
        error: error.message,
      });
    } else {
      //422 for not created
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
});

employeeRouter.post("/login", schemaValidator(loginSchema), async (req, res) => {
  try {
    const employeeData = req.body;
    const token = await loginEmployee(employeeData);
    
    res.status(200).json({
      message: "Employee was successfully logged in",
      token: token,
    });
  } catch (error) {
    if (error.message === "Invalid email address or password. Please try again") {
      res.status(400).json({
        error: error.message,
      })
    }
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

employeeRouter.get("/roles", async (req, res) => {
  try {
    const roles = await getRoles();

    res.status(200).json({
      message: "Roles were successfully obtained",
      roles: roles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = employeeRouter;
