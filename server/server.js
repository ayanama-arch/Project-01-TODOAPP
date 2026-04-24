const dotenv = require("./app/config/dotenv.config");
const app = require("./app/app");
const connectDB = require("./app/config/connectDB");

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
