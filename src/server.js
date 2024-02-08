require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection is working");
};

connection();

// mongoose docs: https://mongoosejs.com/docs/guide.html

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

const logTypeOfResult = async (result) => {
  console.log(`Typeof result: ${typeof result} - result: ${result}`);
};

// https://mongoosejs.com/docs/models.html (look at constructing documents)
// Add a single book to the db
app.post("/books/addBook", async (request, response) => {
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
});

// https://mongoosejs.com/docs/api/model.html#Model.find()
app.get("/books/getAllBooks", async (request, response) => {
  try {
    const books = await Book.find({});
    response.send({ message: "Success: All books retrieved", books: books });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to retrieve books" });
  }
});

// https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
//              Or !!!!!!!!!!!!!!!!!!!!!
// https://mongoosejs.com/docs/api/model.html#Model.updateOne()
app.put("/books/updateAuthor", async (request, response) => {
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
});

// https://mongoosejs.com/docs/guide.html - you'll have to look at the docs and figure this one out!
app.delete("/books/delete", async (request, response) => {
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
});

app.delete("/books/deleteAll", async (request, response) => {
  try {
    await Book.deleteMany({});
    response.send({ message: "Success: All books deleted" });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to delete books" });
  }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
