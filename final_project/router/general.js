const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); 

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1 & 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 100);
      });
    };
    const booksData = await getBooks();
    return res.status(200).json(booksData);
  } catch (err) {
    return res.status(500).json({message: "Error getting books"});
  }
});

// Task 2 & 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByIsbn = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found!");
    }
  });
  
  getBookByIsbn
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({message: err}));
});

// Task 3 & 12: Get book details based on author using Async/Await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const getBooksByAuthor = () => {
      return new Promise((resolve, reject) => {
        const result = [];
        for (let key in books) {
          if (books[key].author === author) {
            result.push(books[key]);
          }
        }
        if (result.length > 0) resolve(result);
        else reject("Author not found");
      });
    };
    const booksByAuthor = await getBooksByAuthor();
    return res.status(200).json(booksByAuthor);
  } catch (err) {
    return res.status(404).json({message: err});
  }
});

// Task 4 & 13: Get all books based on title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve, reject) => {
    const result = [];
    for (let key in books) {
      if (books[key].title === title) {
        result.push(books[key]);
      }
    }
    if (result.length > 0) resolve(result);
    else reject("Title not found");
  });

  getBooksByTitle
    .then((booksList) => res.status(200).json(booksList))
    .catch((err) => res.status(404).json({message: err}));
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;

// =======================================================
// AXIOS CLIENT IMPLEMENTATION (TASKS 10-13 REQUIREMENT)
// =======================================================

const getAllBooksAxios = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const getBookByISBNAxios = (isbn) => {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
};

const getBookByAuthorAxios = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const getBookByTitleAxios = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};
