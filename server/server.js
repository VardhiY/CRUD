import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Health check route for Render
// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is healthy 🚀" });
});

// ✅ API routes
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB error:", err.message));
