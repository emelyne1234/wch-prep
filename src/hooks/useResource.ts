import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ResourceType } from "@/types/resource";
export const useCreateResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resource: ResourceType) => {
      const response = await axios.post("/api/resources", resource);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

interface ResourceResponse {
  data: ResourceType[];
  pagination: {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
  message: string;
}

export const useGetResources = (page: number, pageSize: number) => {
  return useQuery<ResourceResponse>({
    queryKey: ["resources", page, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/resources?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    },
  });
};

export const useGetResourceById = (id: string) => {
  return useQuery<ResourceType>({
    queryKey: ["resources", id],
    queryFn: async () => {
      const response = await axios.get(`/api/resources/${id}`);
      return response.data;
    },
  });
};

export const useDeleteResource = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/resources/${id}`);
      return response.data;
    },
  });
};
