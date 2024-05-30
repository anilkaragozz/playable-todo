const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    max: 250,
    required: true,
  },
  description: {
    type: String,
    min: 10,
    max: 250,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  attachments: {
    type: String,
  },
  tags: [
    {
      name: {
        type: String,
      },
    },
  ],
});

TodoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("todo", TodoSchema);
