"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/projects/Sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <Header />
      <Sidebar />
      <div className="container pb-24">
        {children}
      </div>
    </div>
  );
}
