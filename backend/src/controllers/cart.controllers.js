import { UserModel } from "../models/user.models.js"


// get user cart data
export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        
        const userData = await UserModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = await userData.cartData

        return res.status(200).json({
            success: true,
            data: cartData,
            message: "Cart fetched successfully",
        });
    } catch (error) {
        console.error("Failed to fetched cart:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetched cart",
            error: error.message,
        });
    }
}

// add product to user cart
export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body
        const userId = req.user._id
        
        console.log("user id: ", userId)
    
        const userData = await UserModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists
    
        // Check if item already exists in cart
        if (!cartData[itemId]) {
            cartData[itemId] = {}; // Initialize item
        }

        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 1; // Initialize quantity
        } else {
            cartData[itemId][size] += 1; // Increase quantity
        }

        // Update user's cart in the database
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } }, // Use $set to update only cartData
            { new: true } // Return updated document
        );

        return res.status(200).json({
            success: true,
            data: updatedUser.cartData,
            message: "Added to cart successfully",
        });
    } catch (error) {
        console.error("Failed to add to cart:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add to cart",
            error: error.message,
        });
    }
}

// update user cart
export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.user._id

        if (!itemId || !size || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Item ID, size, and quantity are required",
            });
        }

        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative",
            });
        }

        // Fetch user data
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists

        // Check if item exists in cart, if not, initialize it
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Update quantity for the given size
        cartData[itemId][size] = quantity;

        // Save updated cart data
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { 
                $set: { cartData } 
            },
            { new: true}
        )

        return res.status(200).json({
            success: true,
            data: updatedUser.cartData,
            message: "Cart updated successfully",
        });

    } catch (error) {
        console.error("Failed to update cart:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update cart",
            error: error.message,
        });
    }
};
