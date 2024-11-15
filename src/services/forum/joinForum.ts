import { joinForum } from "@/types/forum";
import axios from "axios";


export const JoinForum = async(data: joinForum ) => {
    const response = await axios.post("/api/forums/join", data);
    return response.data
}