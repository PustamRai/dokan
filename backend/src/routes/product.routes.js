import { Router } from "express"
import { 
    addProduct, 
    listProducts, 
    removeProduct, 
    singleProduct 
} from "../controllers/product.controllers.js"

const productRouter = Router()

productRouter.get("/list", listProducts)
productRouter.post("/add", addProduct)
productRouter.post("/remove", removeProduct)
productRouter.post("/single", singleProduct)

export default productRouter