import mongoose from "mongoose";
import Categories from "./categories.js"; // Import the Categories model

// Products schema
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories", // Reference the Categories model
  },
  image: String,
  rating: Object,
});

// Products model
const Products = mongoose.model("Product", productSchema, "products");
export default Products;