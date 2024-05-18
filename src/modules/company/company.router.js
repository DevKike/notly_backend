const express = require("express");
const registerCompanyAndDirector = require("./controller/company.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const registerCompanyAndDirectorSchema = require("./schema/company.schema");

const companyRouter = express.Router();

companyRouter.post("/", schemaValidator(registerCompanyAndDirectorSchema), async (req, res) => {
  try {
    const { companyData, directorData } = req.body;
    await registerCompanyAndDirector(companyData, directorData);

    res.status(201).json({
      message: "Company was successfully registered",
    });
  } catch (error) {
    if (error.message === "Nit has already been registered" || error.message === "Cellphone has already been registered" || error.message === "Email already in use" || error.message === "Role was not found") {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Company was not created",
      error: error.message,
    });
  }
});

module.exports = companyRouter;
