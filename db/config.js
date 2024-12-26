// const mongoose = require("mongoose");

// // MongoDB Atlas connection string
// const mongoURI =
//   "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

// // Connect to MongoDB Atlas
// mongoose
//   .connect(mongoURI, {
//     serverSelectionTimeoutMS: 50000, // Extended timeout for server selection
//     family: 4, // Forces IPv4 usage
//   })
//   .then(() => {
//     console.log("Successfully connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err.message);
//   });

const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30s
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
