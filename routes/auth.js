const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");

const router = Router();

// Create User
router.post("/new", createUser);

// Login User
router.post("/", loginUser);

// Renew Token
router.get("/renew", renewToken);

module.exports = router;
