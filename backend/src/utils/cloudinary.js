import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();

  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });

  // Upload on cloudinary
  const uploadOnCloudinary = async (localFilePath, folderName = "dokan") => {
    try {
      if(!localFilePath) return null;

      // upload the file on cloudinary
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder: folderName
      })

      // Delete the local file after upload
      fs.unlinkSync(localFilePath)
      return uploadResult
    } catch (error) {
      console.log("Error uploading file to Cloudinary:", error);

      // remove the locally saved temporary file as the upload operation got failed
      fs.unlinkSync(localFilePath)
      return null
    }
  }

export {uploadOnCloudinary}