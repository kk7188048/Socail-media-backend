import User from "../models/user.models.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
};

export const registerUser = async (req, res) => {
  try {
    console.log("Entering registerUser");

    // 1. Validate User Input
    const { name, email, password, phone } = req.body; // Destructure data
    const validationErrors = validateUserInput(name, email, password, phone); // Call validation function

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: "Invalid user data", errors: validationErrors });
    }

    const existingUser = await User.findOne({ email }); // Check for duplicate email
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // 3. Hash Password Securely
    const hashedPassword = await bcrypt.hash(password, 10); // Use a strong cost factor (e.g., 12 or higher)

    // 4. Create New User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone, // Assuming phone is a required field
    });
    
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(201).json({ user });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Handle unexpected errors gracefully
  }
};


function validateUserInput(name, email, password, phone) {
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Name is required");
  }

  if (!email) {
    errors.push("Invalid email address");
  }

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!phone || phone.trim() === "") { // Assuming phone is required
    errors.push("Phone number is required");
  }

  return errors;
}










export const loginUser = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json({ user, token: accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login user' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user profile' });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.user.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user profile' });
  }
};
