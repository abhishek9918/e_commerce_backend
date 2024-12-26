// const mongoose = require("mongoose");

// const mongoURI =
//   "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("Successfully connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
//   });

const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true, // Optional, but recommended for MongoDB connection parsing
    useUnifiedTopology: true, // Helps with the new MongoDB driver's behavior
    serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
