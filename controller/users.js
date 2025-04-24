import mongoose from "mongoose";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// fetch all products
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await user.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        data: null,
        error: "null",
      });
    }
    res.status(200).json({
      message: "user fetched successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//signup user
const signupUser = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    // Validate the request body
    const validationError = [];
    if (!name) {
      validationError.push("Name is required");
    }
    if (!email) {
      validationError.push("Email is required");
    }
    if (!password) {
      validationError.push("Password is required");
    }
    if (!confirmPassword) {
      validationError.push("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      validationError.push("Password and Confirm Password do not match");
    }

    if (validationError.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: validationError.join(", "),
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "validation error",
        data: null,
        error: "User already exists",
      });
    }
    // Hash the password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "Internal Server Error",
          data: null,
          error: err.message,
        });
      }
      const user = new User({
        name,
        email,
        password: hash,
      });
      await user.save();
      // Send the response
      const { password, ...userWithoutPassword } = user.toObject();
      res.status(201).json({
        message: "User created successfully",
        data: userWithoutPassword,
        error: null,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//userLogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the request body
    if (!email || !password) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: "Email and Password are required",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid email or password",
      });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: "Invalid email or password",
      });
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    // Send the response
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: userWithoutPassword,
        token: token,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const id = req.params.id; // Extract user ID from the decoded token
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate the request body
    const validationError = [];
    if (!oldPassword) validationError.push("Old Password is required");
    if (!newPassword) validationError.push("New Password is required");
    if (!confirmNewPassword) validationError.push("Confirm New Password is required");
    if (newPassword !== confirmNewPassword) {
      validationError.push("New Password and Confirm New Password do not match");
    }

    if (validationError.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: validationError.join(", "),
      });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        error: "Invalid user ID",
      });
    }

    // Compare the old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({
        message: "Validation error",
        data: null,
        error: "Old password is incorrect",
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    // Send the response
    res.status(200).json({
      message: "Password changed successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getUsers, getUser, signupUser, userLogin, changePassword };
