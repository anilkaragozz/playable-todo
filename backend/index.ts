const dotenv = require("dotenv");
const express = require("express");
const databaseConnection = require("./config/db");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const todoRouter = require("./routes/todo");

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

databaseConnection();

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
