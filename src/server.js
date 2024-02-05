const express = require("express");
const path = require("path");

const app = express();

app.use("/example", express.static("example"));

app.use("/Lorem", express.static("Lorem"));

// app.get("/health", (req, res) => {
//   res.send("healthy");
// });

app.listen(5001, () => {
  console.log("server is listening on port 5001");
});
