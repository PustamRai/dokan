import { Router } from "express"
import { 
    adminLogin, 
    allOrders, 
    getAdminData, 
    updateStatus
} from "../controllers/admin.controllers.js"
import { adminAuth } from "../middlewares/adminAuth.middlewares.js"

const adminRouter  = Router()

// public routes
adminRouter.post('/login', adminLogin)

// protected routes
adminRouter.get('/dashboard', adminAuth, getAdminData)
adminRouter.post('/list', adminAuth, allOrders)
adminRouter.post('/status', adminAuth, updateStatus)

export default adminRouter