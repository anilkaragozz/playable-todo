const { body, param, query } = require("express-validator");

const registerValidator = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

const loginValidator = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

const createTodoValidator = [
  body("title", "Title is required").notEmpty(),
  body("description", "Description is required").notEmpty(),
  body("tags", "Tags must be an array").isArray(),
];

const uploadTodoImageValidator = [param("id", "Invalid todo ID").isMongoId()];

const uploadTodoAttachmentsValidator = [
  param("id", "Invalid todo ID").isMongoId(),
];

const getTodosValidator = [
  query("page", "Page must be a number").optional().isInt(),
  query("limit", "Limit must be a number").optional().isInt(),
  query("search", "Search query must be a string").optional().isString(),
  query("tags", "Tags must be a comma-separated string").optional().isString(),
];

const updateTodoValidator = [
  param("id", "Invalid todo ID").isMongoId(),
  body("title", "Title must be a string").optional().isString(),
  body("description", "Description must be a string").optional().isString(),
  body("tags", "Tags must be an array").optional().isArray(),
];

const deleteTodoValidator = [param("id", "Invalid todo ID").isMongoId()];

module.exports = {
  registerValidator,
  loginValidator,
  createTodoValidator,
  uploadTodoImageValidator,
  uploadTodoAttachmentsValidator,
  getTodosValidator,
  updateTodoValidator,
  deleteTodoValidator,
};
