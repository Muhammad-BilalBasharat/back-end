import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes
dotenv.config();
app.use(morgan("dev"));
app.use(express.json()); // Middleware for parsing JSON bodies
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Fetch products from the database
app.get("/products", async (req, res) => {
  try {
    const products = await Products.find()
    .select(["title", "price","id"])
      .limit(10)
      .skip(3)
      .sort({ price: -1 });
    res.status(200).json({
      message: "Products fetched successfully",
      response: products,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// fetch a single product by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the id parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        data: null,
        error: "Invalid product ID",
      });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      response: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// delete a single product by id
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the id parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        data: null,
        error: "Invalid product ID",
      });
    }
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      data: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// add a new product
app.post("/products", async (req, res) => {
  try {
    let {title,price,id} = req.body;
    // Validate the request body
    const validationError = [];
    if (!title){
      validationError.push("title is required");
    }
    if (!price){
      validationError.push("price is required");
    }
    if (!id){
      validationError.push("id is required");
    }
    
    if (validationError.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: validationError.join(", "),
      });
    }
    const product = new Products({
      title,
      price,
      id,
    });
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      data: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Update a product by id
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    // Validate the id parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        data: null,
        error: "Invalid product ID",
      });
    }
    const product = await Products.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      data: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//Database connection
const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed connecting to MongoDB:", error);
  }
};
Database();

// Products schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Object,
});

// Products model
const Products = mongoose.model("Product", productSchema, "products");
