"use client";

import Sidebar from "@/components/projects/Sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container py-5 px-5" style={{ marginLeft: "4.5rem" }}>
        {children}
      </div>
    </div>
  );
}
