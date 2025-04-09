import { Router } from "express"
import {
    allOrders,
    userOrders,
    updateStatus,
    placeOrder
} from "../controllers/order.controllers.js"
import { adminAuth } from "../middlewares/adminAuth.middlewares.js"
import { authUser } from "../middlewares/auth.middlewares.js"

const orderRouter = Router()

// Admin features
orderRouter.post("/list", adminAuth, allOrders)
orderRouter.post("/status", adminAuth, updateStatus)

// Payment features
orderRouter.post("/place-order", authUser, placeOrder)

// User features
orderRouter.get("/userorders", authUser, userOrders)

export default orderRouter