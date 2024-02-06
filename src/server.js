const express = require("express");

const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("http://someaddress.com"); // sends GET request

// HTTP Verb GET

const fakeArr = [];

app.use(express.json());

app.get("/books", (request, response) => {
  console.log("/books: ", request.path);
  response.send({ message: "success", fakeArr: fakeArr });
});

app.get("/books/getfirstbook", (request, response) => {
  // get te first book
  console.log("/books/books: ", request.path);
  const book = fakeArr[0];
  response.send({ message: "success", book: book });
});

app.post("/books", (request, response) => {
  console.log("title: ", request.body.title);
  console.log("genre: ", request.body.genre);
  console.log("author: ", request.body.author);

  fakeArr.push(request.body);

  let awesome;
  for (let i = 0; i < fakeArr.length; i++) {
    if (fakeArr[i].title === request.body.title) {
      awesome = "it's awesome";
    }
  }
  console.log(awesome);
  response.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});

app.put("/books", (request, response) => {
  // in here, find a book by title (i.e. an element of fakeArr where the element title is the same as request.body.title)
  // change (update) the author to an new name

  const titleToUpdate = request.body.title;
  const newAuthor = request.body.newAuthor;

  // Find the index of the book with the given title
  const index = fakeArr.findIndex((book) => book.title === titleToUpdate);

  if (index !== -1) {
    // this update the author if the book is found
    fakeArr[index].author = newAuthor;
    response.send({ message: "success", updatedBook: fakeArr[index] });
  } else {
    response.status(404).send({ message: "Book not found" });
  }
});

app.delete("/books", (request, response) => {
  // in here, find a book by title (i.e. an element of fakeArr where the element title is the same as request.body.title)
  // remove (delete) the element from the array
  const titleToDelete = request.body.title;

  // Find the index of the book with the given title
  const index = fakeArr.findIndex((book) => book.title === titleToDelete);

  if (index !== -1) {
    // this removes the book if found
    const deletedBook = fakeArr.splice(index, 1)[0];
    response.send({ message: "success", deletedBook: deletedBook });
  } else {
    response.status(404).send({ message: "Book not found" });
  }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
