const express = require("express");
require("dotenv").config();

const { userRegister, userLogin } = require("../controllers/user.controller");

const UserRouter = express.Router();


UserRouter.post("/register", userRegister);

UserRouter.post("/login",userLogin );

module.exports = UserRouter;