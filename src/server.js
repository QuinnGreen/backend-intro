const express = require("express");
const mongoose = require("mongoose");
const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("http://someaddress.com"); // sends GET request

// HTTP Verb GET

const fakeArr = [];

app.use(express.json());

const connection = async () => {
  await mongoose.connect(
    "mongodb+srv://williammsullivansabre:Qm20ANJxDcDry6ZY@cluster0.agjwwpz.mongodb.net/m54booksWeek7"
  );
  console.log("db connection is working");
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

app.get("/books", (request, response) => {});

app.get("/books/getfirstbook", (request, response) => {});

app.post("/books", (request, response) => {});

app.put("/books", (request, response) => {});

app.delete("/books", (request, response) => {});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
