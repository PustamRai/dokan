import jwt from "jsonwebtoken";
import { OrderModel } from "../models/order.models.js";


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
export const updateStatus = async (req, res) => {};
