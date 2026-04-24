const express = require("express");
const router = express.Router();

// GET    /api/todos        # Get all todos
// POST   /api/todos        # Create todo
// GET    /api/todos/:id    # Get single todo
// PUT    /api/todos/:id    # Update todo
// DELETE /api/todos/:id    # Delete todo

// Get all todos
router.get("/todos");

// Create todo
router.post("/todos");

// Get single todo
router.get("/todos/:id");

// Update todo
router.put("/todos/:id");

// Delete todo
router.delete("/todos/:id");

module.exports = router;
