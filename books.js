const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { saveBooks, loadBooks } = require('./db');

const router = new express.Router();

// Add a book
router.post('/', (req, res) => {
  const { title, description } = req.body;
  const books = loadBooks();

  if (!title) return res.status(400).json({ msg: 'Title should not emtpy' });
  const duplicateBook = books.find((book) => book.title === title);

  if (!duplicateBook) {
    const newBook = {
      title,
      description,
      id: uuidv4(),
    };

    books.push(newBook);
    saveBooks(books);

    res.status(201).send(newBook);
  } else {
    res.status(400).json({ msg: "Book's Name taken" });
  }
});

// Update book by id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const books = loadBooks();

  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ msg: 'Book not found' });
  }

  if (!title) return res.status(400).json({ msg: 'Title should not emtpy' });
  const duplicateBook = books.find((book) => book.title === title);

  if (!duplicateBook) {
    const newBooks = books.filter((book) => book.id !== id);
    const newBook = {
      title,
      description,
      id,
    };
    newBooks.push(newBook);

    saveBooks(newBooks);

    res.send(newBooks);
  } else {
    res.status(400).json({ msg: "Book's Name taken" });
  }
});

// Get all books
router.get('/', (req, res) => {
  const books = loadBooks();
  res.json(books);
});

// Get a book by id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const books = loadBooks();
  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).json({ msg: 'Book not found' });
  }

  res.json(book);
});

// Delete all books
router.delete('/', (req, res) => {
  saveBooks([]);
  res.json({ msg: 'Deleted' });
});

// Delete book by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const books = loadBooks();
  const book = books.find((book) => book.id === id);

  if (!book) return res.status(404).json({ msg: 'Book not found' });

  const newBooks = books.filter((book) => book.id !== id);

  saveBooks(newBooks);

  res.send(newBooks);
});

module.exports = router;
