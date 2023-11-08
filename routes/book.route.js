import express from "express";
import {
  getAllBooks,
  getBookById,
  updateBook,
  newBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/:id", updateBook);
router.post("/", newBook);
router.delete("/:id", deleteBook);

export default router;
