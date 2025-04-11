import { Router } from "express"
import { 
    adminLogin, 
    getAdminData 
} from "../controllers/admin.controllers.js"
import { adminAuth } from "../middlewares/adminAuth.middlewares.js"

const adminRouter  = Router()

// public routes
adminRouter.post('/login', adminLogin)

// protected routes
adminRouter.get('/dashboard', adminAuth, getAdminData)

export default adminRouter