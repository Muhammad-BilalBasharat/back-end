import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import Database from "./config/database.js";
import userRoutes from "./routes/user.js";


const app = express();
app.use(cors()); // Enable CORS for all routes
dotenv.config();
app.use(morgan("dev"));
 // Middleware for parsing JSON bodies
app.use(express.json());


const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// Connect to the database
Database();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", userRoutes);


// Start the server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


