import mongoose from "mongoose";
import Products from "../models/products.js";


// fetch all products
const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
            .select(["title", "price", "id","category"])
            .populate("category")

            // .limit(10)
            // .skip(3)
            // .sort({ price: -1 });
        res.status(200).json({
            message: "Products fetched successfully",
            data: products,
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getProductById = async (req, res) => {
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
            data: product,
            error: null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
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
};

const addProduct = async (req, res) => {
    try {
        let { title, price, id,category } = req.body;
        // Validate the request body
        const validationError = [];
        if (!title) {
            validationError.push("title is required");
        }
        if (!price) {
            validationError.push("price is required");
        }
        if (!id) {
            validationError.push("id is required");
        }
        if (!category) {
            validationError.push("category is required");
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
            category
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
};

const updateProduct = async (req, res) => {
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
};

export { getProducts, getProductById, deleteProduct, addProduct, updateProduct };