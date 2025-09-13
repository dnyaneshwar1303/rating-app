const express = require("express");
const { signup, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup); // Normal user signup
router.post("/login", login);   // Login for all roles

module.exports = router;
