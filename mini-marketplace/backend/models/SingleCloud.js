import mongoose from "mongoose";

const schema = new mongoose.Schema({
  image: {
    url: { type: String, required: true },
    id: { type: String, required: true },
  },
});

export const SingleCloud = mongoose.model("SingleCloud", schema);
