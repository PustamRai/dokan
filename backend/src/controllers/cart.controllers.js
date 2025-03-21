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
        const { userId, itemId, size } = req.body
    
        const userData = await UserModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = await userData.cartData
    
        // Check if item exists in cart
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData += 1 // Increase quantity
            }
            else {
                cartData[itemId][size] = 1 // Add new size with quantity 1
            }
        } else {
            cartData[itemId] = {} // Create new item entry
            cartData[itemId][size]
        }
    
        // Update user's cart in the database
        await UserModel.findByIdAndUpdate(
            userId,
            {cartData}
        )
    
        return res.status(200).json({
            success: true,
            data: cartData,
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
        const { userId, itemId, size, quantity } = req.body;

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
        await UserModel.findByIdAndUpdate(
            userId, 
            { 
                $set: { cartData } 
            }
        )

        return res.status(200).json({
            success: true,
            data: cartData,
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
