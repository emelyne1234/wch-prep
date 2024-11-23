import {
  CreateProjectDTO,
  ProjectType,
  ProjectMemberType,
  ProjectGoalType,
  ProjectNeedType,
} from "@/types/Project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
interface ProjectResponse {
  message: string;
  data: ProjectType[];
}

export interface Member {
  memberId: string;
  projectId: string;
  userId: string;
  role: string;
  userName: string;
  userImage: string;
}

interface ProjectDetailsResponse {
  message: string;
  data: {
    project: ProjectType;
    members: Member[];
    goals: ProjectGoalType[];
    needs: ProjectNeedType[];
  };
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

export const useGetProjectMembers = (id: string) => {
  return useQuery<ProjectMemberType[]>({
    queryKey: ["project-members", id],
    queryFn: async () => {
      const response = await axios.get<ProjectMemberType[]>(
        `/api/projects/${id}/users`
      );
      return response.data;
    },
    enabled: !!id,
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

export const useGetProjectById = (id: string) => {
  return useQuery<ProjectDetailsResponse>({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await axios.get<ProjectDetailsResponse>(
        `/api/projects/${id}`
      );
      console.log("project details", response.data);
      return response.data;
    },
    enabled: !!id,
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

export const useGetUserProjects = () => {
  const session = useSession();
  return useQuery<{ data: ProjectType[]; message: string }>({
    queryKey: ["user-projects"],
    queryFn: async () => {
      const response = await axios.get<{
        data: ProjectType[];
        message: string;
      }>("/api/users/projects");
      return response.data;
    },
    enabled: !!session.data?.user,
  });
};

export const useAddProjectGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { goal: string; projectId: string }) => {
      const response = await axios.post(
        `/api/projects/${data.projectId}/goals`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", data.projectId] });
    },
  });
};

export const useAddProjectNeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      need: string;
      projectId: string;
      roleType: string;
    }) => {
      const response = await axios.post(
        `/api/projects/${data.projectId}/needs`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", data.projectId] });
    },
  });
};
