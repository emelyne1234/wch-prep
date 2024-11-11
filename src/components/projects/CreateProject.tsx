"use client";

import { useCreateProject } from "@/hooks/useProject";
import { createProjectSchema, ProjectType } from "@/types/Project";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "next-axiom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateProjectProps {
  onClose: () => void;
}

export default function CreateProject({ onClose }: CreateProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: zodResolver(createProjectSchema),
  });

  const { mutate: createProject, isPending } = useCreateProject();

  const onSubmit = async (data: ProjectType) => {
    try {
      createProject(data, {
        onSuccess: () => {
          toast.success("Project created successfully");
          onClose(); // Close the form after successful creation
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Create New Project</h2>
        <button 
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
        <div className="col-12">
          <label className="form-label">Title</label>
          <input
            {...register("title")}
            className="form-control"
            placeholder="Project Title"
          />
          {errors.title && (
            <p className="text-danger small">{errors.title.message}</p>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            {...register("description")}
            className="form-control"
            rows={4}
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-danger small">{errors.description.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select {...register("status")} className="form-select">
            <option disabled value="">
              Select Status
            </option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            {...register("location")}
            className="form-control"
            placeholder="Project Location"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            {...register("startDate", {
              setValueAs: (value) => (value ? new Date(value) : undefined),
            })}
            className="form-control"
          />
          {errors.startDate && (
            <p className="text-danger small">{errors.startDate.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            {...register("endDate", {
              setValueAs: (value) => (value ? new Date(value) : undefined),
            })}
            className="form-control"
          />
          {errors.endDate && (
            <p className="text-danger small">{errors.endDate.message}</p>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Funding Status</label>
          <select {...register("fundingStatus")} className="form-select">
            <option disabled value="">
              Select Funding Status
            </option>
            <option value="funded">Funded</option>
            <option value="partial">Partially Funded</option>
            <option value="seeking">Seeking Funding</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Evaluation</label>
          <textarea
            {...register("evaluation")}
            className="form-control"
            rows={4}
            placeholder="Project Evaluation"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill">
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
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