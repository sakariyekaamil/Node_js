require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("../router/bookRouter");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Books API is running" });
});

app.use("/books", bookRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
