const express = require("express");
const { getOwnerDashboard } = require("../controllers/owner.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware(["OWNER"]), getOwnerDashboard);

module.exports = router;
