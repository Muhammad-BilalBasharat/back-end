import mongoose from "mongoose";

// Categories schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Categories model
const Categories = mongoose.model("Categories", categorySchema, "categories");
export default Categories;