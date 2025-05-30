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

// @fetchUserData
export const fetchUser = async (req, res) => {
try {
  const user = await UserModel.findById(req?.user?._id)
  
  if(!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200)
  .json({
    success: true,
    data: user,
    message: 'User data fetched successfully'
  })
} catch (error) {
  console.error("Error fetching user data", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
}
}

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
    if (password.length < 8) {
      return res.status(401).json({
        success: false,
        message: "Password length should be greater than 8",
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

