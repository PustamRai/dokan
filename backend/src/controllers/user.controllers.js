import { UserModel } from "../models/user.models.js";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign(
    { _id }, 
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );
};

// @register route
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name === "" || email === "" || password === "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking if user exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // validating email format and checking password length
    if (!validator.isEmail(email)) {
      return res.status(404).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 3) {
      return res.status(401).json({
        success: false,
        message: "Password length should be greater than 3",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      data: {
        user,
        token
      },
      message: "User registered successfully",
    })
  } catch (error) {
    console.error("error registering new user: ", error);
    return res.status(500).json({
      success: false,
      message: "user registration failed",
      error: error.message,
    });
  }
};

// @login route
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
  
    const user = await UserModel.findOne({ email })
  
    if(!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
  
    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(401)
      .json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = createToken(user._id)

    const loggedInUser = await UserModel.findById(user._id).select("-password")

    return res.status(200).json({
      success: true,
      data: {
        user: loggedInUser, token
      },
      message: "User login successfully",
    })
  } catch (error) {
    console.error("error login user: ", error);
    return res.status(500).json({
      success: false,
      message: "user login failed",
      error: error.message,
    });
  }
};

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
