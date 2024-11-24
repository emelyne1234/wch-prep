"use client";
import Header from "@/components/Header";
import React from "react";
import { useState } from "react";
import { resources } from "@/components/dashboard/constant";
import { Search } from "lucide-react";
import { useGetResources } from "@/hooks/useResource";

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error } = useGetResources(currentPage, pageSize);

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "conservation", name: "Conservation Basics" },
    { id: "research", name: "Research" },
    { id: "technology", name: "Technology" },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      (activeCategory === "all" || resource.category === activeCategory) &&
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-green-600 mb-2">
                {categories.find((c) => c.id === resource.category)?.name}
              </div>
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize">
                  {resource.type}
                </span>
                <button className="text-green-500 hover:text-green-600">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default ResourcesPage;
