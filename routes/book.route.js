import express from "express";
import {
  getAllBooks,
  getBookById,
  updateBook,
  newBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/:id", updateBook);
router.post("/", newBook);

export default router;
