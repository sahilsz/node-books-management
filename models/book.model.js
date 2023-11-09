import mongoose from "mongoose";
import { type } from "os";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
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
