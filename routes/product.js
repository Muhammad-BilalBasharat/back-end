import { getProducts, getProductById, deleteProduct, addProduct, updateProduct } from "../controller/products.js";
import express from "express";
import validateId from "../middleware/validateId.js";
const router = express.Router();

// Basic route Fetch products from the database
router.get("/", getProducts);
router.get("/:id", validateId, getProductById);
router.delete("/:id", validateId, deleteProduct);
router.post("", addProduct);
router.put("/:id", validateId, updateProduct);
export default router; 
