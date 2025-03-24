import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Order Placed"
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Cash on Delivery", "Khalti", "eSewa", "Card"]
        },
        payment: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true
    }
)

export const OrderModel = mongoose.model("Order", orderSchema)