const userController = require("../controllers/users.controller");

const express = require("express");
const { model } = require("mongoose");
const router = express.Router();


router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/register",userController.userProfile);

module.exports = router;