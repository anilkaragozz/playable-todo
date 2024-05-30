const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const db_uri = process.env.MONGO_URI;

const database = () => {
  mongoose
    .connect(db_uri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error: Error) => {
      console.error("Database connection error:", error);
    });
};

module.exports = database;
