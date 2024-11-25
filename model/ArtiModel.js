import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true }, // e.g., 'Hindi', 'English'
  content: { type: String, required: true }, 
});

const aartiSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    languages: [languageSchema], 
    audio: { type: String }, 
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Aarti", aartiSchema);
