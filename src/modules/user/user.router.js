const express = require("express");
const registerUser = require("./controller/user.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const registerSchema = require("./schema/user.schema");

const userRouter = express.Router();

userRouter.post("/", schemaValidator(registerSchema), async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    await registerUser(userData);

    res.status(201).json({
      message: "User was succesfully registered",
    });
  } catch (error) {
    if (error.message === "Email already in use" || error.message === "Role was not found") {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "User was not created",
        error: error.message,
      });
    }
  }
});

module.exports = userRouter;
