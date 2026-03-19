const express = require("express");
const ensureAuthenticated = require("../middleware/auth");
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("Logged in user details: ", req.user);

  res.status(200).json([
    {
      name: "Mobile",
      price: 44000,
    },
    {
      name: "monitor",
      price: 50000,
    },
  ]);
});

module.exports = router;
