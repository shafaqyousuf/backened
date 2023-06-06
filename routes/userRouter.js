const express = require("express");
const route = express.Router();
const userModel = require("../models/userModel");
const { sendRes } = require("../helper/helper");
const bcrypt = require("bcryptjs");
const AuthController = require("../controllers/authController");

route.post("/signup", AuthController.signup);

route.post("/login", AuthController.login);

route.post("/");
route.post("/");
route.put("/");
route.delete("/");

module.exports = route;
