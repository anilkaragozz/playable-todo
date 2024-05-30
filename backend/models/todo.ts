const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now },
  is_completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  attachments: [
    {
      file_url: {
        type: String,
        required: true,
      },
      file_name: {
        type: String,
        required: true,
      },
      uploaded_at: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("todo", TodoSchema);
