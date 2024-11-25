"use client";
import Header from "@/components/Header";
import React from "react";
import { useParams } from "next/navigation";
import { useGetResourceById } from "@/hooks/useResource";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { data: resource, isLoading, error } = useGetResourceById(id as string);

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "conservation-basics", name: "Conservation Basics" },
    { id: "research", name: "Research" },
    { id: "technology", name: "Technology" },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 mt-10 py-8">
        <Link
          href="/resources"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">Error loading resource</div>
        ) : resource ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-sm text-green-600 mb-2">
                {categories.find((c) => c.id === resource.category)?.name}
              </div>

              <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500 capitalize px-3 py-1 bg-gray-100 rounded-full">
                  {resource.type}
                </span>
                {resource.contentUrl && (
                  <a
                    href={resource.contentUrl}
                    className="text-green-500 hover:text-green-600 flex items-center"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Resource
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{resource.description}</ReactMarkdown>
              </div>

              {resource.contentUrl && (
                <div className="mt-8 border-t pt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Additional Information
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <a
                      href={resource.contentUrl}
                      className="text-green-600 hover:text-green-700"
                      target="_blank"
                      rel="noopener noreferrer">
                      {resource.contentUrl}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">Resource not found</div>
        )}
      </main>
    </>
  );
};

export default ResourceDetailPage;
