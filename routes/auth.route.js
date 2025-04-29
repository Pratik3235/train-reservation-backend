const express = require("express");
const { userSignup, userLogin } = require("../controllers/auth.controller");
const authRoutes = express.Router();

authRoutes.post("/signup", userSignup );

authRoutes.post("/login", userLogin);

module.exports = authRoutes;
