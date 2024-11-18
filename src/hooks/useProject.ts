import { CreateProjectDTO, ProjectType } from "@/types/Project";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ProjectResponse {
  message: string;
  data: ProjectType;
}
export const useGetProjects = () => {
  return useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get<ProjectType[]>("/api/projects");
      return response.data;
    },
  });
};

export const useCreateProject = () => {
  return useMutation<ProjectResponse, Error, CreateProjectDTO>({
    mutationFn: async (data: CreateProjectDTO) => {
      const formattedData = {
        ...data,
        endDate: data.endDate
          ? new Date(data.endDate).toISOString()
          : new Date().toISOString(),
        startDate: data.startDate
          ? new Date(data.startDate).toISOString()
          : new Date().toISOString(),
      };

      const response = await axios.post<ProjectResponse>(
        "/api/projects",
        formattedData
      );
      return response.data;
    },
  });
};

export const useJoinProject = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.post(`/api/projects/${id}/join`);
      return response.data;
    },
  });
};
