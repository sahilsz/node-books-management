import Book from "../models/book.model.js";
import createError from "../utils/createError.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log(books);

    return res.json({ status: "Success", books: books });
  } catch (err) {
    return next(err);
  }
};

export const getBookById = async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(createError(404, "Book not found!"));
  }

  return res.status(200).json({ status: "Success", book: book });
};

export const updateBook = async (req, res, next) => {
  try {
    const { title, summary } = req.body;

    if (!title || !summary) return next(createError(400, "Invalid data"));

    const book = await Book.findById(req.params.id);

    if (!book) return next(createError(404, "Book not found!"));

    book.title = title;
    book.summary = summary;

    const updatedBook = await book.save();
    return res.status(200).json({ staus: "Success", book: updatedBook });
  } catch (err) {
    return next(err);
  }
};

export const newBook = async (req, res, next) => {
  try {
    const { title, summary } = req.body;

    if (!title || !summary) {
      return next(createError(400, "Send the appropriate data"));
    }

    const book = new Book({ ...req.body, author: "admin" });

    await book.save();

    if (!book) {
      return next(createError());
    }

    return res.status(201).json({ status: "Success", book: book });
  } catch (err) {
    return next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return next(createError(404, "Book not found!"));

    if (book.author !== req.userId)
      return next(createError(403, "You cannot delete this book!"));

    await Book.findByIdAndDelete(req.params.id);

    return res.status(200).json({ status: "Success", message: "deleted" });
  } catch (err) {
    return next(err);
  }
};
