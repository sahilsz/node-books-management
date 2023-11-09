import express from "express";
import cookieParser from "cookie-parser";
import booksRoute from "./routes/book.route.js";

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/books", booksRoute);

// Error handler

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(err);

  return res
    .status(errorStatus)
    .json({ status: "Failure", message: errorMessage });
});

export default app;
