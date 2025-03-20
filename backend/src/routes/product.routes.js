import { Router } from "express"
import { upload } from "../middlewares/multer.middlewares.js"
import { 
    addProduct, 
    listProducts, 
    removeProduct, 
    singleProduct 
} from "../controllers/product.controllers.js"
import { adminAuth } from "../middlewares/adminAuth.middlewares.js"

const productRouter = Router()

productRouter.get("/list", listProducts)
productRouter.post("/add", adminAuth, upload.single("image"), addProduct)
productRouter.post("/remove/:productId", adminAuth, removeProduct)
productRouter.post("/single/:productId", singleProduct)

export default productRouter