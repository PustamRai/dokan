import { OrderModel } from "../models/order.models.js"


// All orders data for Admin Panel
export const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({})
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        return res.status(200)
        .json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        })
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
}

// user order data for frontend
export const userOrders = async (req, res) => {
    try {
        const userId = req.user._id
    
        const orders = await OrderModel.find({userId})
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
}

// update orders status for Admin Panel
export const updateStatus = async (req, res) => {

}