// const mongoose = require("mongoose");

// const mongoUrl ="mongodb+srv://zabhishekojha7379:RvF4U9036iaADbk0@ecomproject.ufpap.mongodb.net/?retryWrites=true&w=majority&appName=ecomProject";

// mongoose
//   .connect(mongoUrl)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//   });

const mongoose = require("mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Try a shorter timeout
});
require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  });
