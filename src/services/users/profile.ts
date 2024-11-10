import { User } from "@/types/user";
import axios from "axios";

export const profileData = async(data: User) => {
    const response = await axios.post("/api/profile", data)
    return response.data
}

