const express = require("express");
const { submitRating } = require("../controllers/rating.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["USER"]), submitRating);

module.exports = router;
