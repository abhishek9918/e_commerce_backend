// // const mongoose = require("mongoose");
// // mongoose.connect("mongodb://localhost:27017/e-commerce");

// const mongoose = require("mongoose");

// // Replace the local connection string with the MongoDB Atlas connection string
// const mongoURI =
//   "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Successfully connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
//   });

const mongoose = require("mongoose");

// const mongoURI =
//   "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoURI =
  "mongodb+srv://ojhaabhishek312:dhMhLWQNzRPJtVVz@cluster0.yw6i4.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
