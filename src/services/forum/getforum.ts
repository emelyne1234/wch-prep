import axios from "axios";


export const getAllForums = async() => {
    const response = await axios.get("/api/forums");
    return response.data
}