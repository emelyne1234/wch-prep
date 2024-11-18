import { UpdateprofileInterface, User } from "@/types/user";
import axios from "axios";

export const profileData = async (
  data: UpdateprofileInterface
): Promise<{ message: string }> => {
  const response = await axios.patch("/api/profile", data);
  return response.data;
};
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "default_preset");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/my-cloud-name01/image/upload",
    formData
  );

  if (response.status !== 200) {
    throw new Error("Failed to upload image");
  }

  return response.data.secure_url;
};
