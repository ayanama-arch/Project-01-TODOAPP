const ApiResponse = require("../utils/ApiResponse");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return ApiResponse.error(res, message, statusCode, { stack: err.stack });
};

module.exports = globalErrorHandler;
