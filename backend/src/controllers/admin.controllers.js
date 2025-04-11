import jwt from "jsonwebtoken";

// @admin route
export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
          { email, role: "admin" }, 
          process.env.JWT_SECRET,
          { expiresIn: "1h" } 
        )
  
        return res.status(200).json({
          success: true,
          data: token,
          message: "Admin logged in successfully",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Admin login failed:", error);
      return res.status(500).json({
        success: false,
        message: "Admin login failed",
        error: error.message,
      });
    }
  };

// get admin data
export const getAdminData = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome, admin!",
    data: { email: req.admin.email },
  });
};

