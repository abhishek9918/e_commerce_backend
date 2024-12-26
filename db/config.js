const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 50000, // Keep the extended timeout
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
