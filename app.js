import express from "express";
import booksRoute from "./routes/book.route.js";

const app = express();

// Middlewares

app.use(express.json());

// Routes

app.use("/api/books", booksRoute);

export default app;
