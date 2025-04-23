import express from "express";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categories.js";
import validateId from "../middleware/validateId.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", validateId, getCategoryById);
router.post("/", addCategory);
router.put("/:id", validateId, updateCategory);
router.delete("/:id", validateId, deleteCategory);

export default router;
