import jwt from "jsonwebtoken";
import { OrderModel } from "../models/order.models.js";
import { ProductModel } from "../models/product.models.js";


// get admin data
export const getAdminData = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome, admin!",
    data: { email: req.admin.email },
  });
};

// @admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const adminUser = {
        name: "Pustam Rai",
        email,
        role: "admin"
      };

      return res.status(200).json({
        success: true,
        data: {
          token,
          user: adminUser,
        },
        message: "Admin logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Admin login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message,
    });
  }
};



// All orders data for Admin Panel
export const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// update orders status 
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).
      json({ message: "Order not found" });
    } 

    return res.status(200).json({
      success: true,
      data: order,
      message: "Orders status updated",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update orders status",
      error: error.message,
    });
  }
};

export const removeProductItem = async (req, res) => {
  const { productId } = req.params

  try {
    const product = await ProductModel.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
  
    const deleteProductItem = await ProductModel.findByIdAndDelete(productId)
  
    return res.status(200).json({
      success: true,
      data: deleteProductItem,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log("failed to delete product items: ", error);
    return res.status(500).json({
      success: false,
      message: "failed to delete product",
      error: error.message,
    });
  }
}
