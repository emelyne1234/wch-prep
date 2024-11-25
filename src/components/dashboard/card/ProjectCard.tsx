"use client";
import { useJoinProject } from "@/hooks/useProject";
import { ProjectType } from "@/types/Project";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProjectCard = ({ item }: { item: ProjectType }) => {
  const { mutate: joinProject, isPending } = useJoinProject();
  const router = useRouter();
  const handleJoin = (projectId: string) => {
    joinProject(projectId, {
      onSuccess: () => {
        toast.success("Joined project successfully");
        router.push(`/projects/${projectId}`);
      },
    });
  };
  return (
    <div
      key={item.projectId}
      className="relative p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      <span
        className={`absolute top-2 right-0 bg-green-500 text-xs text-white px-2 py-1 rounded-l-full ${
          item.status === "Not Started" ? "bg-red-500" : "bg-green-500"
        }`}>
        {item.status}
      </span>
      <div className="w-full pb-2 pt-3 group cursor-pointer overflow-hidden rounded-xl">
        <Image
          src={item.image || ""}
          alt={item.title}
          width={300}
          height={150}
          className="w-full h-[300px] object-cover rounded-xl group-hover:scale-[1.01] transition-all duration-700 hover:rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <span className="text-sm text-blue-800">{item.location}</span>
        </div>
        <p className="text-sm text-gray-500 text-wrap">{item.description}</p>
        <div className="flex justify-between pt-4">
          <span className="absolute bottom-4 left-0 text-sm text-gray-900 bg-lime-400 px-2 py-1 rounded-r-full">
            {new Date(item.startDate).toLocaleDateString()}
          </span>
          <button
            onClick={() => handleJoin(item.projectId as string)}
            className="absolute bottom-4 right-4 text-sm text-gray-600 border border-gray-900 rounded-full px-6 py-1 hover:bg-black hover:text-white transition-colors duration-700">
            {isPending ? "Joining..." : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
