const Book = require("./model");

const addBook = async (request, response) => {
  try {
    const book = await Book.create({
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
    });
    response.send({ message: "Success: Book created", book: book });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to create book" });
  }
};

const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find({});
    response.send({ message: "Success: All books retrieved", books: books });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to retrieve books" });
  }
};

const updateAuthor = async (request, response) => {
  try {
    const title = request.body.title;
    const updatedAuthor = request.body.author;

    // Find the book by title and update the author
    const updatedBook = await Book.findOneAndUpdate(
      { title: title },
      { $set: { author: updatedAuthor } },
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).send({ message: "Error: Book not found" });
    }

    response.send({ message: "Success: Author updated", book: updatedBook });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to update author" });
  }
};

const deleteBook = async (request, response) => {
  try {
    const title = request.body.title;

    // Find the book by title and delete it
    const deletedBook = await Book.findOneAndDelete({ title: title });

    if (!deletedBook) {
      return response.status(404).send({ message: "Error: Book not found" });
    }

    response.send({ message: "Success: Book deleted", book: deletedBook });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to delete book" });
  }
};

const deleteAll = async (request, response) => {
  try {
    await Book.deleteMany({});
    response.send({ message: "Success: All books deleted" });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to delete books" });
  }
};

module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  updateAuthor: updateAuthor,
  deleteBook: deleteBook,
  deleteAll: deleteAll,
};
