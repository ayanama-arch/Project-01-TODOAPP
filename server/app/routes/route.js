const express = require("express");
const TodoController = require("../controllers/todo-controller");

const router = express.Router();

// GET    /api/todos        # Get all todos
// POST   /api/todos        # Create todo
// GET    /api/todos/:id    # Get single todo
// PUT    /api/todos/:id    # Update todo
// DELETE /api/todos/:id    # Delete todo

// Get all todos
router.get("/todos", TodoController.getAllTodos);

// Create todo
router.post("/todos", TodoController.createTodo);

// Get single todo
router.get("/todos/:_id", TodoController.getSingleTodo);

// Update todo
router.put("/todos/:_id", TodoController.updateTodo);

// Delete todo
router.delete("/todos/:_id", TodoController.deleteTodo);

router.get("/notifications", TodoController.getNotifications);

module.exports = router;
