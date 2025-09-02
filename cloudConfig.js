const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ✅ Use defaults if .env is missing
const cloudName = process.env.CLOUD_NAME || "demo"; // Cloudinary's public demo account
const apiKey = process.env.CLOUD_API_KEY || "1234567890";
const apiSecret = process.env.CLOUD_API_SECRET || "abc123xyz";

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Configure storage (uploads)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["png", "jpg", "jpeg"], // supported formats
  },
});

module.exports = {
  cloudinary,
  storage,
};
