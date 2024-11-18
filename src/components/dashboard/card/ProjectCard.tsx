import Image from "next/image";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { ProjectType } from "@/types/Project";
import { formatDate } from "date-fns";

const ProjectCard = ({
  items,
  isJoin,
  isLoading,
}: {
  items: ProjectType;
  isJoin: boolean;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <Card className="p-6 relative rounded-xl">
        <div className="absolute top-4 right-0 w-24 h-6 bg-gray-200 animate-pulse rounded-l-full" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="w-3/4 h-7 bg-gray-200 animate-pulse rounded-md" />
            <div className="w-1/2 h-5 bg-gray-200 animate-pulse rounded-md" />
          </div>
          <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md" />
          <div className="flex justify-between pt-4">
            <div className="absolute bottom-4 left-0 w-24 h-6 bg-gray-200 animate-pulse rounded-r-full" />
            <div className="absolute bottom-4 right-4 w-28 h-8 bg-gray-200 animate-pulse rounded-full" />
          </div>
        </div>
      </Card>
    );
  return (
    <Card key={items.projectId} className="p-4 relative rounded-xl">
      <span
        className={`absolute top-2 right-0 bg-green-500 text-xs text-white px-2 py-1 rounded-l-full ${
          items.status === "Not Started" ? "bg-red-500" : "bg-green-500"
        }`}>
        {items.status}
      </span>
      <div className="w-full pb-2 pt-3 group cursor-pointer overflow-hidden rounded-xl">
        <Image
          src={items.image as string}
          alt={items.title}
          className="w-full h-full object-cover rounded-xl group-hover:scale-[1.01] transition-all duration-700 hover:rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{items.title}</h2>
          <span className="text-sm text-blue-800">{items.location}</span>
        </div>
        <p className="text-sm text-gray-500 text-wrap">{items.description}</p>
        <div className="flex justify-between pt-4">
          <span className="absolute bottom-4 left-0 text-sm text-gray-900 bg-lime-400 px-2 py-1 rounded-r-full">
            {formatDate(items.startDate, "yyyy-MM-dd")}
          </span>
          <Link href={`/projects/${items.projectId}`}>
            <button className="absolute bottom-4 right-4 text-sm text-gray-600 border border-gray-900 rounded-full px-6 py-1 hover:bg-black hover:text-white transition-colors duration-700">
              {isJoin ? "Join" : "View Details"}
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
