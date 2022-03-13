const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { notes } = require("../db/db.json");

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

module.exports = router;
