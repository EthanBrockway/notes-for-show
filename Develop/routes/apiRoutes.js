const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { notes } = require("../db/db.json");

function findById(id, notes) {
  const result = notes.filter((notes) => notes.id === id)[0];
  return result;
}

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  }
  console.log(notes);
  res.send(404);
});

module.exports = router;
