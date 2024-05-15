const express = require("express");
const companyRouter = require("../modules/company/company.router");
const personRouter = require("../modules/person/person.router");

const app = express();

app.use(express.json());

app.use("/company", companyRouter);
app.use("/person", personRouter)

module.exports = app;