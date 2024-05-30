const express = require("express");

const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require("../controllers/todo");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
