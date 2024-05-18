const express = require("express");
const cors = require("cors");
const companyRouter = require("../modules/company/company.router");
const employeeRouter = require("../modules/employee/employee.router");
const projectRouter = require("../modules/project/project.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/company", companyRouter);
app.use("/employee", employeeRouter);
app.use("/project", projectRouter);

module.exports = app;
