import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Message {
  id: string;
  messageText: string;
  projectId: string;
  createdAt: string;
  senderId: string;
  senderName: string;
  image: string;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<Message, Error, { messageText: string; projectId: string }>({
    mutationFn: async (data: { messageText: string; projectId: string }) => {
      const response = await axios.post(
        `/api/projects/${data.projectId}/messages`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useGetMessages = (id: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const response = await axios.get(`/api/projects/${id}/messages`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 0,
    refetchInterval: 1000,
  });
};
