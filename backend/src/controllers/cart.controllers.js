import { UserModel } from "../models/user.models.js"

// get user cart data
export const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id
        
        const userData = await UserModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || [] // ensure cartData is an array

        return res.status(200).json({
            success: true,
            data: cartData,
            message: "Cart fetched successfully",
        });
    } catch (error) {
        console.error("Failed to fetch cart:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error: error.message,
        });
    }
}

// add product to user cart
export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body
        const userId = req.user._id
        
        const userData = await UserModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData || []; // Ensure cartData exists as an array
    
        // Check if item already exists in cart
        const existingItemIndex = cartData.findIndex(item => item.itemId === itemId && item.size === size);
        
        if (existingItemIndex === -1) {
            // Item doesn't exist, add new item
            cartData.push({ itemId, size, quantity: 1 });
        } else {
            // Item exists, update quantity
            cartData[existingItemIndex].quantity += 1;
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

// update user cart data
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

        let cartData = userData.cartData || []; // Ensure cartData exists

        // Check if item exists in cart
        const existingItemIndex = cartData.findIndex(item => item.itemId === itemId && item.size === size);
        
        if (existingItemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        // Update quantity for the given size
        cartData[existingItemIndex].quantity = quantity;

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
