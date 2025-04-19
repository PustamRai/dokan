import { OrderModel } from "../models/order.models.js";
import { UserModel } from "../models/user.models.js";

// Placing orders using COD Method
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user?._id;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // create order object
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: new Date(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, {
      cartData: [],
    });

    return res.status(200).json({
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("error in placing order: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place orders",
      error: error.message,
    });
  }
};

// user order data for frontend
export const userOrders = async (req, res) => {
  try {
    const userId = req.user?._id;

    const orders = await OrderModel.find({ userId });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
      message: "User orders retrieved successfully",
    });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};


// track user order status
export const trackOrderStatus = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found" 
      });
    } 

    return res.status(200).json({ 
      success: true,
      data: { status: order.status },
      message: "order found for tracking user order status"
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch user order status",
      error: error.messages
    });
  }
}

