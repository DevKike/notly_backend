const express = require("express");
const { registerPerson, loginPerson, getRoles } = require("./controller/person.controller");
const schemaValidator = require("../../middleware/schemaValidator.middleware");
const { registerSchema, loginSchema } = require("./schema/person.schema");

const personRouter = express.Router();

personRouter.post("/register", schemaValidator(registerSchema), async (req, res) => {
  try {
    const personData = req.body;
    await registerPerson(personData);

    res.status(201).json({
      message: "Person was successfully registered",
    });
  } catch (error) {
    if (
      error.message === "Email already in use" ||
      error.message === "Role was not found"
    ) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      //422 para not created
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
});

personRouter.post("/login", schemaValidator(loginSchema), async (req, res) => {
  try {
    
  } catch (error) {

  }
});

personRouter.get("/roles", async (req, res) => {
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

module.exports = personRouter;
