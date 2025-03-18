import { ProductModel } from "../models/product.models.js";
import { uploadOnCloudinary } from "../routes/cloudinary.js";

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
export const listProducts = (req, res) => {

}

// functions for removing product
export const removeProduct = (req, res) => {

}

// functions for single product
export const singleProduct = (req, res) => {

}