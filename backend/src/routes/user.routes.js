import { Router } from "express"
import { 
    adminLogin, 
    fetchUser, 
    loginUser, 
    registerUser 
} from "../controllers/user.controllers.js"
import { authUser } from "../middlewares/auth.middlewares.js"

const userRouter = Router()

userRouter.get("/me", authUser, fetchUser)
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", adminLogin)

export default userRouter