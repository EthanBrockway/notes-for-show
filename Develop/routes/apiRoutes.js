const path = require("path");
const fs = require("fs");
const router = require("express").Router();
let { notes } = require("../db/db.json");

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.post("/notes", (req, res) => {
  if (typeof req.body === "object") {
    let db = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    db = JSON.parse(db);
    let notePosted = false;
    if (req.body.title) {
      for (let i = 0; i < db.length; i++) {
        if (db[i].title === req.body.title) {
          notePosted = true;
          break;
        }
      }
    } else notePosted = true;
    if (!notePosted) {
      req.body.id = idCreate();
      db.push(req.body);
      fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(db)
      );
    }
    res.sendFile(path.join(__dirname, "../db/db.json"));
  } else {
    res.status(400);
    res.end();
  }
});

router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const deleted = notes.find((note) => note.id === id);
  if (deleted) {
    notes = notes.filter((note) => note.id !== id);
  } else {
    res.status(404).json({ message: "note doesn't exist" });
  }
});
function idCreate() {
  var uuid = Math.floor(Math.random() * 20000);
  return uuid;
}
module.exports = router;
