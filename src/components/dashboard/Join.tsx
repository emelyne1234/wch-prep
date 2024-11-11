"use client";

import React from "react";
import ProjectCard from "./card/ProjectCard";
import { useGetProjects } from "@/hooks/useProject";

const Join = () => {
  const { data: projects, isLoading } = useGetProjects();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects?.map((item) => (
        <ProjectCard items={item} isJoin={true} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default Join;
