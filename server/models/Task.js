import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
