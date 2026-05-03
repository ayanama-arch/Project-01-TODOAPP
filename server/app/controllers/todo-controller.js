const todoValidationSchema = require("../services/validate-todo");
const TryCatch = require("../utils/TryCatch");
const { ErrorCodes, ErrorHandler } = require("../utils/ErrorHandler");
const ApiResponse = require("../utils/ApiResponse");
const TodoModel = require("../models/todo-model");

const createTodo = TryCatch(async (req, res, next) => {
  console.log("BODY: ", req.body);
  const { error, value } = todoValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new ErrorHandler(ErrorCodes.UNPROCESSABLE_ENTITY),
      "please provide valid fields to create task.",
    );
  }

  console.log("ERROR: ", error);
  console.log("VALUE: ", value);

  const todo = await TodoModel.create(value);

  ApiResponse.created(res, (data = todo), "todo created successfully");
});

const updateTodo = TryCatch(async (req, res, next) => {
  const taskId = req.params._id;

  const { error, value } = todoValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new ErrorHandler(ErrorCodes.UNPROCESSABLE_ENTITY),
      "please provide valid fields to create task.",
    );
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate(taskId, value, {
    new: true,
  });
  if (!updateTodo) {
    return next(
      new ErrorHandler(ErrorCodes.NOT_FOUND, "updated task is invalid."),
    );
  }

  ApiResponse.success(res, (data = updatedTodo), "todo updated successfully");
});

const getAllTodos = TryCatch(async (req, res, next) => {
  const existingTodos = await TodoModel.find({}).sort({ createdAt: -1 });

  return ApiResponse.success(res, (data = existingTodos));
});

const deleteTodo = TryCatch(async (req, res, next) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(req.params._id);

  if (!deletedTodo) {
    return next(
      new ErrorHandler(ErrorCodes.NOT_FOUND, "deleted task is invalid."),
    );
  }

  ApiResponse.success(res, "task deleted successfully");
});

module.exports = { createTodo, updateTodo, getAllTodos, deleteTodo };
