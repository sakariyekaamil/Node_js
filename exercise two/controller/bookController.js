const Book = require("../model/bookModel");

// POST /books
const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      publishedYear,
      genre,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books  (optional ?year=2022)
const getBooks = async (req, res) => {
  try {
    const filter = {};

    if (req.query.year) {
      filter.publishedYear = Number(req.query.year);
    }

    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books/search?genre=fiction
const searchBooks = async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({
        message: "Please provide a genre query, e.g. /books/search?genre=fiction",
      });
    }

    const books = await Book.find({
      genre: { $regex: genre, $options: "i" },
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /books/:id
const updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;

    if (title !== undefined && !title) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    if (author !== undefined && !author) {
      return res.status(400).json({ message: "Author cannot be empty" });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedYear, genre },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  searchBooks,
  getBookById,
  updateBook,
  deleteBook,
};
