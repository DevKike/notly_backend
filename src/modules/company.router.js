const express = require("express");
const registerCompany = require("./company/controller/company.controller");

const companyRouter = express.Router();

companyRouter.post("/", async (req, res) => {
  try {
    const companyData = req.body;
    await registerCompany(companyData);

    res.status(201).json({
      message: "Company was successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      message: "Company was not created",
      error: error.message,
    });
  }
});

module.exports = companyRouter;
