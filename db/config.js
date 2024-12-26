const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
