const express = require("express");
const { registerCompanyAndDirector, getCompanyByDirector, updateCompanyData } = require("./controller/company.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { registerCompanyAndDirectorSchema, updateCompanySchema } = require("./schema/company.schema");
const authToken = require("../../middleware/authToken.middleware");
const verifyRole = require("../../middleware/verifyRole.middleware");

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

companyRouter.get("/get", authToken(), verifyRole("Director"), async (req, res) => {
  try { 
    const directorId = req.employee;

    const company = await getCompanyByDirector(directorId);

    res.status(200).json({
      message: "Company was successfully obtained",
      company: company,
    });
  } catch(error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

companyRouter.patch("/update", authToken(), verifyRole("Director"), schemaValidator(updateCompanySchema), async (req, res) => {
  try {
    const directorId = req.employee;
    const companyData = req.body;

    await updateCompanyData(directorId, companyData);
    res.status(200).json({
      message: "Company was successfully updated",
    });
  } catch(error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = companyRouter;
