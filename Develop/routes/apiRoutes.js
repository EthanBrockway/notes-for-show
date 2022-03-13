const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { notes } = require("../db/db.json");

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

module.exports = router;
