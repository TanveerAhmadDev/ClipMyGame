import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const verifyAdminPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new apiError(400, "Admin password is required.");
  }

  if (password !== process.env.ADMIN_PANEL_PASSWORD) {
    throw new apiError(401, "Invalid admin password.");
  }

  return res.status(200).json(
    new apiResponse(200, "Admin access granted.", {
      isAdmin: true,
    }),
  );
});
