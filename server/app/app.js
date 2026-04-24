const globalErrorHandler = require("./middlewares/error-middleware");
const apiRoutes = require("./routes/route");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/check-health", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "application health is optimum." });
});

// API Routes
app.use(`/api/${process.env.API_VERSION}`, apiRoutes);

app.use(globalErrorHandler);

module.exports = app;
