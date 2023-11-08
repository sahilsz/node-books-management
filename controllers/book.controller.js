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

  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {};

export const updateBook = async (req, res, next) => {};

export const newBook = async (req, res, next) => {};
