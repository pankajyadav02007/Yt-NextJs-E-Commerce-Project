import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
