"use client";

import React, { useState } from "react";
import ProjectCard from "./card/ProjectCard";
import { useGetProjects, useGetUserProjects } from "@/hooks/useProject";
import { ProjectType } from "@/types/Project";

const Join = () => {
  const { data: projects } = useGetProjects();
  const { data: userProjects } = useGetUserProjects();

  // compare userProjects with projects and set filteredProjects
  const filteredProjects = projects?.filter((project) => {
    return !userProjects?.data?.some(
      (userProject) => userProject.projectId === project.projectId
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProjects &&
        filteredProjects.map((item: ProjectType, index: number) => (
          <ProjectCard key={index} item={item} />
        ))}
    </div>
  );
};

export default Join;
