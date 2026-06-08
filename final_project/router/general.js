const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve) => {
        resolve(books);
    });
    const bookList = await getBooks;
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByISBN = new Promise((resolve, reject) => {
      if (books[isbn]) {
          resolve(books[isbn]);
      } else {
          reject("Book not found");
      }
  });

  getBookByISBN.then((book) => {
      return res.status(200).json(book);
  }).catch((err) => {
      return res.status(404).json({message: err});
  });
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
      const author = req.params.author;
      const getBooksByAuthor = new Promise((resolve) => {
          let booksByAuthor = [];
          let keys = Object.keys(books);
          for (let i = 0; i < keys.length; i++) {
              if (books[keys[i]].author === author) {
                  booksByAuthor.push({"isbn": keys[i], "title": books[keys[i]].title, "reviews": books[keys[i]].reviews});
              }
          }
          resolve(booksByAuthor);
      });
      const result = await getBooksByAuthor;
      return res.status(200).json({booksbyauthor: result});
  } catch (error) {
      return res.status(500).json({message: "Error fetching books by author"});
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve) => {
      let booksByTitle = [];
      let keys = Object.keys(books);
      for (let i = 0; i < keys.length; i++) {
          if (books[keys[i]].title === title) {
              booksByTitle.push({"isbn": keys[i], "author": books[keys[i]].author, "reviews": books[keys[i]].reviews});
          }
      }
      resolve(booksByTitle);
  });

  getBooksByTitle.then((result) => {
      return res.status(200).json({booksbytitle: result});
  });
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;

// ==========================================
// AXIOS CODE CHO TASKS 10-13 (Bắt buộc phải có cho Câu 11)
// ==========================================
const baseURL = 'http://localhost:5000';

// Task 10: Get all books using Async/Await and Axios
async function getAllBooksAxios() {
    try {
        const response = await axios.get(`${baseURL}/`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Task 11: Get book by ISBN using Promise and Axios
function getBookByISBNAxios(isbn) {
    axios.get(`${baseURL}/isbn/${isbn}`)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
}

// Task 12: Get book by Author using Async/Await and Axios
async function getBookByAuthorAxios(author) {
    try {
        const response = await axios.get(`${baseURL}/author/${author}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Task 13: Get book by Title using Async/Await and Axios
async function getBookByTitleAxios(title) {
    try {
        const response = await axios.get(`${baseURL}/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
