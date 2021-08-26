const { Router } = require("express");
const { check } = require("express-validator");
//
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/fields-validator");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

// Create User
router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is minimum 6 length").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

// Login User
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

// Renew Token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
