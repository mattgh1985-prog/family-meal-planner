const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Family Meal Planner API running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
