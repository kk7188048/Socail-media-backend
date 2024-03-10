import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./apiError.middleware.js";
import { User } from "../models/user.models.js";

// export const authenticate = asyncHandler(async (req, res, next) => {
//   try {
//     console.log("Entering in authenticate middleware")
//     const token = req.headers.authorization.split(' ')[1];
//     console.log("Entering in authenticate middleware 2")

//     if (!token) {
//       throw new ApiError(401, "Token Verification Failed");
//     }
//     console.log("Entering in authenticate middleware 3")

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded)

//     const user = await userSchema.findById(decoded.userId);
//     if (!user) {
//       throw new ApiError(401, "Invalid AccessToken");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({message: "Unauthorized"})
//   }
// });
export const authenticate = asyncHandler(async (req, res, next) => {
  try {
      console.log("Entering in authenticate middleware");
      const token = req.headers.authorization?.split(' ')[1]; // Optional chaining to handle missing header

      if (!token) {
          throw new ApiError(401, "Token Verification Failed");
      }
      console.log("Entering in authenticate middleware 2");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = await User.findById(decoded.userId);
      console.log(user)
      if (!user) {
          throw new ApiError(401, "Invalid AccessToken");
      }
      req.user = user;

      next(); // Call next() after attaching user to request
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          res.status(401).json({ message: "Token expired" });
      } else if (error.name === 'JsonWebTokenError') {
          res.status(401).json({ message: "Invalid token format" });
      } else {
          // Handle other errors (e.g., database errors)
          res.status(500).json({ message: "Internal server error" });
      }
  }
});

