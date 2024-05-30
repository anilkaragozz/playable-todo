import upload from "../middleware/upload";

const express = require("express");

const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  uploadTodoImage,
  uploadTodoAttachments,
} = require("../controllers/todo");

const router = express.Router();

router.post("/", createTodo);
router.post("/uploadImage/:id", upload.single("thumbnail"), uploadTodoImage);
router.post(
  "/uploadAttachments/:id",
  upload.single("attachments"),
  uploadTodoAttachments
);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
