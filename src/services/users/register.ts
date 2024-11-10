import { User } from "@/types/user";
import axios from "axios";

export const registerUser = async(data: User) => {
    const response = await axios.post("/api/users", data)
    return response.data
}

