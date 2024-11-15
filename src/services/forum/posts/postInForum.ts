import axios from "axios";

export const postOnForum = async ({ forumId, content }: { forumId: string; content: string }) => {
  const response = await axios.post(`/api/forums/post/${forumId}`, { content });
  return response.data;
};
