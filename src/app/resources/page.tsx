"use client";
import Header from "@/components/Header";
import React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { useGetResources } from "@/hooks/useResource";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error } = useGetResources(currentPage, pageSize);

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "conservation-basics", name: "Conservation Basics" },
    { id: "research", name: "Research" },
    { id: "technology", name: "Technology" },
  ];
  const router = useRouter();

  const filteredResources =
    data?.data?.filter(
      (resource) =>
        (activeCategory === "all" || resource.category === activeCategory) &&
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleResourceClick = (resourceId: string) => {
    router.push(`/resources/${resourceId}`);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 mt-10 py-8">
        <div className="mt-10">
          <div className="max-w-xl mx-auto"></div>
        </div>

        <div className="lg:flex items-center justify-between">
          <div className="flex flex-wrap  gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 text-xs lg:text-base py-2 rounded-full ${
                  activeCategory === category.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}>
                {category.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className=" w-full flex items-center border-2 border-gray-500 rounded-full focus:ring-2  focus:ring-green-500 pr-24 mb-8">
              <Search className="left-3 m-2 top-2.5 h-5 w-5 text-gray-400 " />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full px-4 border-none py-2 pr-10 outline-none "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading resources</div>
          ) : (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleResourceClick(resource.id as string)}>
                <div className="text-sm text-green-600 mb-2">
                  {categories.find((c) => c.id === resource.category)?.name}
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <div className="text-gray-600 mb-4 line-clamp-3 prose prose-sm max-w-none">
                  <ReactMarkdown>{resource.description}</ReactMarkdown>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">
                    {resource.type}
                  </span>
                  {resource.contentUrl && (
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResourceClick(resource.id as string);
                      }}>
                      View Details →
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}>
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of{" "}
            {Math.ceil((data?.pagination.totalPages || 0) / pageSize)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage >=
              Math.ceil((data?.pagination.totalPages || 0) / pageSize)
            }
            className={`px-4 py-2 rounded-md border ${
              currentPage >=
              Math.ceil((data?.pagination.totalPages || 0) / pageSize)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}>
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default ResourcesPage;
