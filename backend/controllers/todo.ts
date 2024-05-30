import { Response } from "express";
const { validationResult } = require("express-validator");
const {
  createTodoValidator,
  uploadTodoImageValidator,
  uploadTodoAttachmentsValidator,
  getTodosValidator,
  updateTodoValidator,
  deleteTodoValidator,
} = require("../middleware/validator");

const Todo = require("../models/todo");

const createTodo = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    createTodoValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  });
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const uploadTodoImage = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    uploadTodoImageValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const todo = await Todo.findById(req.params.id);
    todo.thumbnail = req.file.path;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const uploadTodoAttachments = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    uploadTodoAttachmentsValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const todo = await Todo.findById(req.params.id);
    todo.attachments = req.file.path;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTodos = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    getTodosValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { page = 1, limit = 7, search = "", tags = "" } = req.query;
    const query = {
      $and: [
        search ? { $text: { $search: search.toString() } } : {},
        tags
          ? {
              tags: {
                $in: tags
                  .toString()
                  .split(",")
                  .map((tag: string) => tag.trim()),
              },
            }
          : {},
      ],
    };

    const paginateOptions = {
      page: parseInt(page as string, 7),
      limit: parseInt(limit as string, 7),
    };

    const pagiatedTodo = await Todo.paginate(query, paginateOptions);
    const todos = await Todo.find();
    res.status(200).json({ pagiatedTodo, todos });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTodo = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    updateTodoValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedFields = {
      ...req.body,
      ...(req.file && { thumbnail: req.file.path }),
      ...(req.files && {
        attachments: (req.files as Express.Multer.File[]).map(
          (file) => file.path
        ),
      }),
    };

    const todo = await Todo.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodo = async (req: typeof Todo, res: Response) => {
  await Promise.all(
    deleteTodoValidator.map((validation: any) => validation.run(req))
  );
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status;
  }
};

module.exports = {
  createTodo,
  uploadTodoImage,
  uploadTodoAttachments,
  getTodos,
  updateTodo,
  deleteTodo,
};
