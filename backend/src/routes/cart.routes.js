import { Router } from "express"
import { 
    addToCart, 
    getUserCart, 
    updateCart 
} from "../controllers/cart.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js"

const cartRouter = Router()

cartRouter.get("/get", authUser, getUserCart)
cartRouter.post("/add", authUser, addToCart)
cartRouter.post("/update", authUser, updateCart)

export default cartRouter