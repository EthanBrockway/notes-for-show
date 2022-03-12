const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/develop/public/index.html"));
});
