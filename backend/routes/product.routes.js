import express from "express";

import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";
const productRouter = express.Router();

productRouter.post("/add-product", authSeller, upload.array("images", 4), addProduct);
productRouter.get("/list", getProducts);
productRouter.get("/id", getProductById);
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;
