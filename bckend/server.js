import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3010;

// ✅ Ensure Database Connection
(async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
})();

// ✅ Enable JSON Parsing and CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

// ✅ Define Routes for Products
app.use("/api/products", productRoute);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
