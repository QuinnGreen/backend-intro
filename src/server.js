const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.send("healthy");
});

app.listen(5001, () => {
  console.log("server is listening on port 5001");
});
