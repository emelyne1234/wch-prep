"use client";
import { useGetUserProjects } from "@/hooks/useProject";
import UserProjectCard from "./card/UserProjectCard";
import { ProjectType } from "@/types/Project";

const HomeDashboard = () => {
  const { data: projects } = useGetUserProjects();
  return (
    <div className="mt-32">
      <h1 className="blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6">
        Joined Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.data &&
          projects?.data?.map((item: ProjectType, index: number) => (
            <UserProjectCard
              key={item.projectId || index}
              item={item}
              isJoin={true}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeDashboard;
