import { Response } from "express";

const Todo = require("../models/todo");

const createTodo = async (req: typeof Todo, res: Response) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    attachments: req.body.attachments,
  });
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTodos = async (req: typeof Todo, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTodo = async (req: typeof Todo, res: Response) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodo = async (req: typeof Todo, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
