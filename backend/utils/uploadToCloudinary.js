import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath, folder = "ClipMyGame") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default uploadToCloudinary;
