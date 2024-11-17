"use client";

import { SideInfo } from "@/components/community/SideInfo";
import Header from "@/components/Header";
import Sidebar from "@/components/projects/Sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col lg:flex-row relative px-4">
        <div className="w-full lg:w-3/4 mt-16">
          {children}
        </div>
        <div className="w-full lg:w-1/4 lg:mt-4">
          <SideInfo />
        </div>
      </div>
    </div>
  );
}
