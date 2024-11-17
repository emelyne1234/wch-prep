import { Post } from "@/types/post";
import axios from "axios";

export const getpostOnForum = async (forumId: string): Promise<any> => {
    const response = await axios.get(`/api/forums/post/${forumId}`);
    return response.data;
  };
