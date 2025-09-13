const express = require("express");
const { createUser, getUsers } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const { updatePassword } = require("../controllers/user.controller");


const router = express.Router();

router.post("/", authMiddleware(["ADMIN"]), createUser);  // Admin adds user
router.get("/", authMiddleware(["ADMIN"]), getUsers);     // Admin views users
router.put("/password", authMiddleware(["USER", "ADMIN", "OWNER"]), updatePassword);


module.exports = router;
