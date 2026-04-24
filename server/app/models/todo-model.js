const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      enum: "low" | "medium" | "high",
    },
    dueDate: {
      type: Date,
      default: null,
      index: true,
    },
    reminderAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Indexing
todoSchema.index({ status: 1, priorityLevel: -1 });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ createdAt: -1 });

// Methods
todoSchema.pre("save", function () {
  if (this.isModified("status") && this.status === "completed") {
    this.completedAt = new Date();
  }
});

const TodoModel =
  mongoose.models.TodoModel || mongoose.model("TodoModel", todoSchema);

module.exports = TodoModel;

// Boss, this schema has a couple of **serious issues** and a lot of missing production concerns. I’ll fix it first, then show you what to add to make it solid.

// ---

// # ❌ Problems in your current schema

// * `titile` → typo (will silently break your app)
// * `enum: "pending" | "in_progress"` → ❌ invalid in Mongoose (that’s JS syntax, not schema)
// * `due_date default` → ❌ `new Date().getDate()` returns a number (1–31), not a Date
// * `priority` as string → works, but limits sorting/logic later

// ---

// # ✅ Polished Production-Ready Schema

// ```js
// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 200,
//     },

//     description: {
//       type: String,
//       trim: true,
//       maxlength: 1000,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "in_progress", "completed"],
//       default: "pending",
//       index: true,
//     },

//     // numeric priority (recommended)
//     priorityLevel: {
//       type: Number,
//       min: 1,
//       max: 5,
//       default: 3,
//       index: true,
//     },

//     // optional label for UI
//     priorityLabel: {
//       type: String,
//       enum: ["low", "medium", "high"],
//       default: "medium",
//     },

//     dueDate: {
//       type: Date,
//       default: null,
//       index: true,
//     },

//     reminderAt: {
//       type: Date,
//     },

//     completedAt: {
//       type: Date,
//     },

//     // soft delete
//     deletedAt: {
//       type: Date,
//       default: null,
//     },

//     // ordering (drag-drop support)
//     order: {
//       type: Number,
//       default: 0,
//     },

//     // tags (simple version)
//     tags: [
//       {
//         type: String,
//         trim: true,
//       },
//     ],

//     // subtasks (embedded for simplicity)
//     subtasks: [
//       {
//         title: String,
//         isCompleted: { type: Boolean, default: false },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );
// ```

// ---

// # ⚙️ Add Indexes (important for performance)

// ```js
// todoSchema.index({ status: 1, priorityLevel: -1 });
// todoSchema.index({ dueDate: 1 });
// todoSchema.index({ createdAt: -1 });
// ```

// ---

// # 🧠 Useful Schema Methods (this is where apps become “real”)

// ## 1. Auto-set `completedAt`

// ```js
// todoSchema.pre("save", function (next) {
//   if (this.isModified("status") && this.status === "completed") {
//     this.completedAt = new Date();
//   }
//   next();
// });
// ```

// ---

// ## 2. Soft delete helper

// ```js
// todoSchema.methods.softDelete = function () {
//   this.deletedAt = new Date();
//   return this.save();
// };
// ```

// ---

// ## 3. Static: get active todos

// ```js
// todoSchema.statics.getActiveTodos = function () {
//   return this.find({ deletedAt: null });
// };
// ```

// ---

// ## 4. Virtual: is overdue

// ```js
// todoSchema.virtual("isOverdue").get(function () {
//   return this.dueDate && this.dueDate < new Date() && this.status !== "completed";
// });
// ```

// ---

// ## 5. Query helper (clean filtering)

// ```js
// todoSchema.query.notDeleted = function () {
//   return this.where({ deletedAt: null });
// };
// ```

// Usage:

// ```js
// TodoModel.find().notDeleted();
// ```

// ---

// # 🔐 Production-Level Improvements (don’t skip)

// ### 1. Validation upgrade

// * Add custom validators (e.g., dueDate > now)

// ```js
// dueDate: {
//   type: Date,
//   validate: {
//     validator: function (value) {
//       return !value || value > new Date();
//     },
//     message: "Due date must be in the future",
//   },
// },
// ```

// ---

// ### 2. Pagination support (API level)

// Not schema, but design:

// ```js
// .limit(10).skip(10)
// ```

// ---

// ### 3. Index for sorting

// Already added → critical for large data

// ---

// ### 4. Avoid hard delete

// Always use:

// ```js
// deletedAt
// ```

// ---

// ### 5. Add `userId` later (for auth)

// ```js
// userId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   index: true,
// }
// ```

// ---

// # ⚠️ Things you should NOT do

// * ❌ Store priority only as string
// * ❌ Use boolean `isDone` (limits workflow)
// * ❌ Skip indexes (kills performance later)
// * ❌ Hard delete data

// ---

// # 🧠 One-line takeaway

// **A production schema = validation + indexing + lifecycle hooks + future flexibility.**

// ---

// If you want next step, Boss:
// I can design your **controller + service layer + API routes** so this schema actually works like a real app (not just DB design).
