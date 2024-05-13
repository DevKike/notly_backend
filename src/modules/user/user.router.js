const express = require("express");
const registerUser = require("./controller/user.controller");

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const userData = req.body;
    await registerUser(userData);

    res.status(201).json({
      message: "User was succesfully registered",
    });
  } catch (error) {
    res.status(500).json({
      message: "User was not created",
      error: error.message,
    });
  }
});

module.exports = userRouter;
