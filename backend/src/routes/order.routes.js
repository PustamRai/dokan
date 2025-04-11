import { Router } from "express"
import {
    userOrders,
    placeOrder
} from "../controllers/order.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js"

const orderRouter = Router()

// Payment features
orderRouter.post("/place-order", authUser, placeOrder)

// User features
orderRouter.get("/userorders", authUser, userOrders)

export default orderRouter