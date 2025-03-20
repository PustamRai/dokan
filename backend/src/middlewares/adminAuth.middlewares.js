import jwt from "jsonwebtoken"

export const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "admin") {
            return res.status(403)
            .json({ 
                success: false, 
                message: "Forbidden. Admin access required." 
            });
        }
        
        req.user = decoded
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