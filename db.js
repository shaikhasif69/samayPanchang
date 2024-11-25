import mongoose from "mongoose";
const dbURI =
  "mongodb+srv://theshaikhasif03:MYDC9DY6ksp5NbWs@samaypanchang.pldb6.mongodb.net/?retryWrites=true&w=majority&appName=SamayPanchang";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};
