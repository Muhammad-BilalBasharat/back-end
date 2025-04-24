import { getProducts, getProductById, deleteProduct, addProduct, updateProduct } from "../controller/products.js";
import express from "express";
import validateId from "../middleware/validateId.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

// Basic route Fetch products from the database
router.get("/", getProducts);
router.get("/:id", validateId, getProductById);
router.delete("/:id", validateId,verifyToken, deleteProduct);
router.post("",verifyToken, addProduct);
router.put("/:id", validateId,verifyToken, updateProduct);
export default router; 
