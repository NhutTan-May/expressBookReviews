const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 10: Get the book list available in the shop using async-await
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

// Task 11: Get book details based on ISBN using Promise
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

// Task 12: Get book details based on author using async-await
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

// Task 13: Get all books based on title using Promise
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
