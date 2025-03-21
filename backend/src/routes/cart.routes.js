import { Router } from "express"
import { 
    addToCart, 
    getUserCart, 
    updateCart 
} from "../controllers/cart.controllers.js"

const cartRouter = Router()

cartRouter.post("/get", getUserCart)
cartRouter.post("/add", addToCart)
cartRouter.post("/update", updateCart)

export default cartRouter