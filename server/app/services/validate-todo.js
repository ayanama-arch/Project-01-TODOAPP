const Joi = require("joi");

const todoValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).allow("", null),
  status: Joi.string()
    .valid("pending", "in_progress", "completed")
    .default("pending"),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  dueDate: Joi.date().greater("now").optional(),
}).required();

module.exports = todoValidationSchema;
