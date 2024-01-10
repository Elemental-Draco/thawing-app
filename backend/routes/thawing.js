const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "show main page" });
});

module.exports = router;
