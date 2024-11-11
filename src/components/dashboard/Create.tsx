"use client";

import { useCreateProject } from "@/hooks/useProject";
import { createProjectSchema, ProjectType } from "@/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "next-axiom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: zodResolver(createProjectSchema),
  });
  console.log("Errors:  ", errors);
  const { mutate: createProject, isPending } = useCreateProject();
  const onSubmit = async (data: ProjectType) => {
    try {
      createProject(data, {
        onSuccess: (data) => {
          toast.success(data.message, {
            style: {
              background: "#000",
              color: "#fff",
            },
            duration: 3000,
            position: "bottom-left",
          });
          reset();
        },
        onError: (error) => {
          toast.error(`Error creating project: ${error.message}`);
        },
      });
    } catch (error) {
      log.error("Error creating project:", error as Error);
    }
  };

  return (
    <>
      <h1 className="blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full rounded-md border py-2 px-3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Project Title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Select Status</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              {...register("location")}
              className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Project Location"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              {...register("startDate")}
              className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate")}
              className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funding Status
          </label>
          <select
            {...register("fundingStatus")}
            className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">Select Funding Status</option>
            <option value="funded">Funded</option>
            <option value="partial">Partially Funded</option>
            <option value="seeking">Seeking Funding</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Evaluation
          </label>
          <textarea
            {...register("evaluation")}
            className="w-full rounded-md py-2 px-3 border border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            placeholder="Project Evaluation"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
