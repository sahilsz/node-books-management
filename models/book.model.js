import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
