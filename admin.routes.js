const express = require("express");
const { getDashboard } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware(["ADMIN"]), getDashboard);

module.exports = router;
