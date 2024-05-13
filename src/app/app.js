const express = require("express");
const companyRouter = require("../modules/company/company.router");
const userRouter = require("../modules/user/user.router");

const app = express();

app.use(express.json());

app.use("/company", companyRouter);
app.use("/user", userRouter)

module.exports = app;