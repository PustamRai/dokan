import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("req user: ", req.user)
    next();
  } catch (error) {
    console.error("Invalid token", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};
