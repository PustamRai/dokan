import jwt from "jsonwebtoken"

export const adminAuth = (req, res, next) => {
    try {
        const token = req?.headers?.authorization
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("decoded value: ", decoded)
        if(decoded.role !== "admin") {
            return res.status(403)
            .json({ 
                success: false, 
                message: "Forbidden. Admin access required." 
            });
        }
        
        req.admin = decoded
        // console.log('req admin: ', req.admin)
        next();
    } catch (error) {
        console.error("Invalid token", error);
        return res.status(401).
        json({
            success: false,
            message: "Invalid token",
            error: error.message,
        });
    }
} 