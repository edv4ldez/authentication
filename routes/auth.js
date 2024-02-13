const express = require("express");

const router = express.Router();

router.post("/login", (req, res, next) => {
  res.status(200).json({ token: "1234" });
});

module.exports = router;
