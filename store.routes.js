const express = require("express");
const { createStore, getStores } = require("../controllers/store.controller");
const authMiddleware = require("../middleware/authMiddleware");
const { getStoresForUsers } = require("../controllers/store.controller");


const router = express.Router();

router.post("/", authMiddleware(["ADMIN"]), createStore); // Admin adds store
router.get("/", authMiddleware(["ADMIN"]), getStores);    // Admin views stores
router.get("/public", authMiddleware(["USER"]), getStoresForUsers);


module.exports = router;
