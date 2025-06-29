import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortenerRoutes from "./routes/shortener";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "";

app.use(cors());
app.use(express.json());
app.use("/", shortenerRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
