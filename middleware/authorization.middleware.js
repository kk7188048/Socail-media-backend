import { ApiError } from "./apiError.middleware.js";
import { asyncHandler } from "./asyncHandler.js";

const checkRoles = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      throw new ApiError(401, "Unauthorized You are not admin")
    }
  });
};

export default checkRoles;