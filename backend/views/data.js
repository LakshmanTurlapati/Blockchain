const express = require("express");
const { getData, triggerSMS } = require("../controllers/data");
const { registerUser, getUser } = require("../controllers/user");

const router = express.Router();

router.get("/data", getData);
router.post("/register", registerUser);
router.get("/user", getUser);

module.exports = router;
