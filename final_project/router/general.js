const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;


// ==========================================
// CODE TASK 10, 11, 12, 13 (CHO CÂU 11)
// ==========================================
const axios = require('axios').default;
const baseURL = 'http://localhost:5000';

// Task 10: Get all books - Async/Await
async function getAllBooks() {
    try {
        const response = await axios.get(`${baseURL}/`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching all books", error);
    }
}

// Task 11: Get book by ISBN - Promise
function getBookByISBN(isbn) {
    axios.get(`${baseURL}/isbn/${isbn}`)
        .then(response => console.log(response.data))
        .catch(error => console.error(`Error fetching book ISBN ${isbn}`, error));
}

// Task 12: Get book by Author - Async/Await
async function getBookByAuthor(author) {
    try {
        const response = await axios.get(`${baseURL}/author/${author}`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching author ${author}`, error);
    }
}

// Task 13: Get book by Title - Async/Await
async function getBookByTitle(title) {
    try {
        const response = await axios.get(`${baseURL}/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching title ${title}`, error);
    }
}
