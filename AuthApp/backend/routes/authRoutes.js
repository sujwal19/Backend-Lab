const {
  signupValidation,
  loginValidation,
} = require("../middleware/authValidation");
const { signup, login } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
