import Book from "../models/book.model.js";
import createError from "../utils/createError.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log(books);

    return res.json({ stauts: "Success", books: books });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {};

export const updateBook = async (req, res, next) => {};

export const newBook = async (req, res, next) => {};
