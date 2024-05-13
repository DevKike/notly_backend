const express = require("express");
const companyRouter = require("../modules/company.router");

const app = express();

app.use(express.json());

app.use("/company", companyRouter);

module.exports = app;