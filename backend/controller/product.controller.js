import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.model.js";

// add product :/api/product/add
export const addProduct = async (req, res) => {
  // try {
  //   const { name, price, offerPrice, description, category } = req.body;
  //   // const image = req.files?.map((file) => `/uploads/${file.filename}`);
  //   const image = req.files?.map((file) => file.filename);
  //   if (
  //     !name ||
  //     !price ||
  //     !offerPrice ||
  //     !description ||
  //     !category ||
  //     !image ||
  //     image.length === 0
  //   ) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "All fields including images are required",
  //     });
  //   }

  //   const product = new Product({
  //     name,
  //     price,
  //     offerPrice,
  //     description,
  //     category,
  //     image,
  //   });

  //   const savedProduct = await product.save();

  //   return res.status(201).json({
  //     success: true,
  //     product: savedProduct,
  //     message: "Product added successfully",
  //   });
  // } catch (error) {
  //   console.error("Error in addProduct:", error);

  //   return res
  //     .status(500)
  //     .json({ success: false, message: "Server error while adding product" });
  // }

  try{
    let productData = JSON.parse(req.body.productData)
    const images = req.files
    let imagesUrl = await Promise.all(
      images.map(async(item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url
      })
    )

    await Product.create({...productData, image: imagesUrl})
    res.json({success: true, message: "Product added successfully"})
  }catch(error){
    console.log(error.message);
    res.json({success: false, message: error.message})
  }
};

// get products :/api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get single product :/api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, product, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
