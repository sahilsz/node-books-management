import express from "express";
import { verifyToken } from "../middleware/jwt.js";
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
router.post("/:id", verifyToken, updateBook);
router.post("/", verifyToken, newBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
