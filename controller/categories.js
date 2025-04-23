import Categories from "../models/categories.js";
import mongoose from "mongoose";

// Fetch all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Fetch a single category by ID
const getCategoryById = async (req, res) => {
  try {

    const { id } = req.params;
    // Validate the id parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
        data: null,
        error: "Invalid category ID",
      });
    }
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Validate the request body
    const validationCategoryError=[];
    if (!name) {
      validationCategoryError.push("Name is required");
    }
    if (!description) { 
      validationCategoryError.push("Description is required");
    }
    if (validationCategoryError.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: validationCategoryError.join(", "),
      });
    }
    const category = new Categories({ name, description });
    await category.save();
    res.status(201).json({
      message: "Category created successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const category = await Categories.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the id parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
        data: null,
        error: "Invalid category ID",
      });
    }
    const category = await Categories.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: category,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };

