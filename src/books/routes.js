const Book = require("./model");
const { Router } = require("express");
const bookRouter = Router();

const {
  addBook,
  getAllBooks,
  updateAuthor,
  deleteBook,
  deleteAll,
} = require("./controllers");

bookRouter.post("/books/addBook", addBook);

bookRouter.get("/books/getAllBooks", getAllBooks);

bookRouter.put("/books/updateAuthor", updateAuthor);

bookRouter.delete("/books/delete", deleteBook);

bookRouter.delete("/books/deleteAll", deleteAll);

module.exports = bookRouter;
