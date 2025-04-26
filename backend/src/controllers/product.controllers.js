import { ProductModel } from "../models/product.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// functions for add product
export const addProduct = async (req, res) => {
    try {
      const { name, description, price, category, sizes, bestseller } = req.body
  
      if(!name || !description|| !price|| !category|| !sizes|| !bestseller ) {
        return res.status(400).json({
          success: false,
          message: "please provide all fields",
        });
      }

      // creating image and checking image
      const imageLocalPath = req.file?.path

      if(!imageLocalPath) {
        return res.status(400).json({
          success: false,
          message: "image field is required",
        });
      }

      // upload image to cloudinary
      const uploadResult = await uploadOnCloudinary(imageLocalPath, "dokan_products")

      if(!uploadResult || !uploadResult.secure_url) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }

      const product = new ProductModel({
        name,
        description,
        price,
        category,
        bestseller: bestseller ? "true" : "false",
        sizes: JSON.parse(sizes),
        image: uploadResult.secure_url,
        date: Date.now()
      })

      await product.save()

      return res.status(200)
      .json({
        success: true,
        data: product,
        message: "Product added successfully"
      })
    } catch (error) {
      console.log("failed to add product: ", error)
      return res.status(400)
      .json({
        success: false,
        message: "failed to add product",
        error: error.message
      })
    }
}

// functions for list product
export const listProducts = async (req, res) => {
  try {
    const product = await ProductModel.find({}).sort({ date: -1 })

    if(product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "products fetched successfully",
    });
  } catch (error) {
    console.error("error in fetching products: ", error);
    return res.status(500).json({
      success: false,
      message: "error in fetching products",
      error: error.message,
    });
  }
}

// functions for removing product
export const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params

    const product = await ProductModel.findById(productId)
    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const remove = await ProductModel.findByIdAndDelete(product)

    res.status(200)
    .json({
      success: true,
      data: remove,
      message: "product removed successfully"
    })
  } catch (error) {
    console.error("failed to remove product: ", error);
    return res.status(500).json({
      success: false,
      message: "failed to remove product",
      error: error.message,
    });
  }
}

// functions for single product
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Single product retrieved successfully",
    });

  } catch (error) {
    console.error("Failed to fetch the product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
