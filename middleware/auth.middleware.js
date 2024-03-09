import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./apiError.middleware.js";
import userSchema from "../models/user.models.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new ApiError(401, "Token Verification Failed");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decoded.userId);
    if (!user) {
      throw new ApiError(401, "Invalid AccessToken");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized"})
  }
});
