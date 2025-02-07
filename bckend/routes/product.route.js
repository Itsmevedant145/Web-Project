import express from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import { updateProduct, deleteProduct } from "../controllers/product.controller.js";


const router = express.Router();

// Get all products
router.get("/", getProducts);

// Create a new product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
