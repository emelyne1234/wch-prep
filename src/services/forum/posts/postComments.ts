import axios from "axios";

export const postComment = async ({ postId, content }: { postId: string; content: string }) => {
  const response = await axios.post(`/api/forums/post/${postId}/comment`, {content});
  return response.data;
};
