import { ProjectType } from "@/types/Project";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (data: ProjectType) => {
      const response = await axios.post<ProjectType>("/api/projects", data);
      return response.data;
    },
  });
};
