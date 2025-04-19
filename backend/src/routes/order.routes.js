import { Router } from "express"
import {
    userOrders,
    placeOrder,
    trackOrderStatus
} from "../controllers/order.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js"

const orderRouter = Router()

// Payment features
orderRouter.post("/place-order", authUser, placeOrder)
    
// track user order status
orderRouter.get("/order-status/:id", authUser, trackOrderStatus)

// User features
orderRouter.get("/userorders", authUser, userOrders)

export default orderRouter