import axios from "axios";


export const getAllForumsByMember = async() => {
    const response = await axios.get("/api/forummember");
    return response.data
}