import { Router } from "express"
import { 
    adminLogin, 
    allOrders, 
    getAdminData, 
    updateOrderStatus,
    removeProductItem
} from "../controllers/admin.controllers.js"
import { adminAuth } from "../middlewares/adminAuth.middlewares.js"

const adminRouter  = Router()

// public routes
adminRouter.post('/login', adminLogin)

// protected routes
adminRouter.get('/dashboard', adminAuth, getAdminData)
adminRouter.get('/list', adminAuth, allOrders)
adminRouter.post('/removeProductItem/:productId', adminAuth, removeProductItem)
adminRouter.post('/order/:id/status', adminAuth, updateOrderStatus)

export default adminRouter