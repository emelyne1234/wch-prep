import axios from "axios";

import { User } from "@/types/user";

export const registerUser = async (data: User) => {
  const response = await axios.post("/api/users", data);
  return response.data;
};
