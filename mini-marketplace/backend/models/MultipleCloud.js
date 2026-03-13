import mongoose from "mongoose";

const schema = new mongoose.Schema({
  image: [
    {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
  ],
});

export const MultipleCloud = mongoose.model("MultipleCloud", schema);
