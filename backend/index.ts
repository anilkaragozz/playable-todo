const dotenv = require("dotenv");
const express = require("express");
const databaseConnection = require("./config/db");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const authVerification = require("./middleware/auth");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 8000;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

databaseConnection();

app.use("/auth", authRouter);

app.use("/todo", authVerification, todoRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
