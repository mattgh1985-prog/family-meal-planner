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

const path = require("path");

// Health check (keep it, but move it off the homepage)
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Family Meal Planner API running" });
});

// Serve the built React app (PWA)
app.use(express.static(path.join(__dirname, "../public")));

// React Router fallback (so /members, /shopping etc work on refresh)
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
