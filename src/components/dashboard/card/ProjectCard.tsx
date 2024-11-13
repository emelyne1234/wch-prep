import React from "react";
import {
  Card,
} from "react-bootstrap";
import Link from "next/link";

const ProjectCard = ({ key, items, isJoin }: { key: number; items: any, isJoin: boolean }) => {
  return (
    <Card key={key} className="p-6 relative rounded-xl">
      <span className={`absolute top-4 right-0 bg-green-500 text-xs text-white px-2 py-1 rounded-l-full ${items.status === "Not Started" ? "bg-red-500" : "bg-green-500"}`}>
        {items.status}
      </span>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{items.title}</h2>
          <span className="text-sm text-blue-800">{items.location}</span>
        </div>
        <p className="text-sm text-gray-500 text-wrap">{items.description}</p>
        <div className="flex justify-between pt-4">
          <span className="absolute bottom-4 left-0 text-sm text-gray-900 bg-lime-400 px-2 py-1 rounded-r-full">
            {items.date}
          </span>
          {/* <Link href={`/projects/${items.id}`}> */}
            <button className="absolute bottom-4 right-4 text-sm text-gray-600 border border-gray-900 rounded-full px-6 py-1 hover:bg-black hover:text-white transition-colors duration-700">
              {isJoin ? "Join" : "View Details"}
            </button>
          {/* </Link> */}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
