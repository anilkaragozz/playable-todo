import upload from "../middleware/upload";

const express = require("express");

const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  uploadTodoImage,
  uploadTodoAttachments,
  getTodosByKey,
} = require("../controllers/todo");

const router = express.Router();

router.post("/", createTodo);
router.post("/:id/uploadImage", upload.single("thumbnail"), uploadTodoImage);
router.post(
  "/:id/uploadAttachments",
  upload.single("attachments"),
  uploadTodoAttachments
);
router.get("/", getTodos);
router.get("/", getTodosByKey);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
