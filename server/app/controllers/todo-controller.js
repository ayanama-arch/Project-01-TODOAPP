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

const getSingleTodo = TryCatch(async (req, res, next) => {
  const todo = await TodoModel.findById(req.params._id);

  if (!todo) {
    return next(new ErrorHandler(ErrorCodes.NOT_FOUND, "todo not found."));
  }

  ApiResponse.success(res, todo);
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

const getNotifications = TryCatch(async (req, res, next) => {
  const now = new Date();

  // 2 hours ahead
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // 1. Upcoming tasks (within next 2 hrs)
  const upcomingTasks = await TodoModel.find({
    dueDate: {
      $gte: now,
      $lte: twoHoursLater,
    },
    status: { $ne: "completed" },
  }).sort({ dueDate: 1 });

  // 2. Missed tasks (deadline passed but not completed)
  const missedTasks = await TodoModel.find({
    dueDate: { $lt: now },
    status: { $ne: "completed" },
  }).sort({ dueDate: -1 });

  ApiResponse.success(res, (data = { upcomingTasks, missedTasks }));
});

module.exports = {
  createTodo,
  updateTodo,
  getAllTodos,
  deleteTodo,
  getNotifications,
  getSingleTodo,
};
