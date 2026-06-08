const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Import Axios

// ==========================================
// TASK 1 to 5: STANDARD EXPRESS ROUTES
// ==========================================

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
      return res.status(200).json(book);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  for (const isbn in books) {
      if (books[isbn].author === author) {
          booksByAuthor.push({ isbn: isbn, ...books[isbn] });
      }
  }
  if (booksByAuthor.length > 0) {
      return res.status(200).json({booksbyauthor: booksByAuthor});
  } else {
      return res.status(404).json({message: "Author not found"});
  }
});

// Task 4: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];
  for (const isbn in books) {
      if (books[isbn].title === title) {
          booksByTitle.push({ isbn: isbn, ...books[isbn] });
      }
  }
  if (booksByTitle.length > 0) {
      return res.status(200).json({booksbytitle: booksByTitle});
  } else {
      return res.status(404).json({message: "Title not found"});
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
      return res.status(200).json(book.reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;


// ==========================================
// TASK 10 to 13: AXIOS & PROMISES IMPLEMENTATION
// ==========================================

/**
 * Task 10: Get all books using Async/Await and Axios
 * This function fetches the list of all books from the local server.
 * It uses async/await to handle the asynchronous HTTP GET request.
 */
const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("Task 10 - All Books:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error.message);
    }
};

/**
 * Task 11: Get book details by ISBN using Promises and Axios
 * This function fetches a specific book by its ISBN using a Promise callback.
 * It handles the success and rejection cases appropriately.
 */
const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(`Task 11 - Book with ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        });
};

/**
 * Task 12: Get book details by Author using Async/Await and Axios
 * This function fetches all books written by a specific author.
 * Proper error handling is included via try/catch blocks.
 */
const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Task 12 - Books by ${author}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by ${author}:`, error.message);
    }
};

/**
 * Task 13: Get book details by Title using Async/Await and Axios
 * This function fetches all books that match a specific title.
 * Proper error handling is included via try/catch blocks.
 */
const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(`Task 13 - Books with title ${title}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books with title ${title}:`, error.message);
    }
};
