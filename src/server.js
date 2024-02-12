require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./db/connection");

const bookRouter = require("./books/routes");

const app = express();

app.use(express.json());
app.use(cors());
connection();

// mongoose docs: https://mongoosejs.com/docs/guide.html

app.use(bookRouter);

const logTypeOfResult = async (result) => {
  console.log(`Typeof result: ${typeof result} - result: ${result}`);
};

app.listen(5002, () => {
  console.log("Server is listening on port 5001");
});
