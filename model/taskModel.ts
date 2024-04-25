import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todoTask: {
      type: String,
      required: [true, "A task is required"],
      unique: true,
    },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default Todo;
