const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in_progress", "completed"],
      index: true,
    },
    priority: {
      type: String,
      default: "medium",
      enum: ["low", "medium", "high"],
    },
    dueDate: {
      type: Date,
      default: null,
      index: true,
      validate: {
        validator: function (value) {
          return !value || value > new Date();
        },
        message: "Due date must be in future.",
      },
    },
    reminderAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Indexing
todoSchema.index({ status: 1, priority: -1 });
todoSchema.index({ createdAt: -1 });

// Methods

todoSchema.methods.changeTaskStatus = function (status) {
  this.status = status;
};

const TodoModel =
  mongoose.models.TodoModel || mongoose.model("TodoModel", todoSchema);

module.exports = TodoModel;
