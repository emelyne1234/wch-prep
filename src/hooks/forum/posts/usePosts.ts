"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import { postOnForum } from "@/services/forum/posts/postInForum";
import showToast from "@/utils/showToast";

interface FormData {
  content: string;
  forumId: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

const postOnForumSchema = z.object({
  content: z.string().min(1, "Content is required"),
  forumId: z.string().min(1, "Forum ID is required"),
});

const initialData: FormData = {
  content: "",
  forumId: "",
};

export const usePostOnForum = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const postOnForumMutation = useMutation({
    mutationFn: postOnForum,
    onSuccess: (response: ApiResponse) => {
      queryClient.invalidateQueries();
      setFormData(initialData);
      setErrors({});
      showToast(response.message || "Post created successfully", "success");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "An error occurred while creating the post";
        showToast(errorMessage, "error");
        setErrors({ submit: errorMessage });
      } else {
        showToast("An unexpected error occurred", "error");
        setErrors({ submit: "An unexpected error occurred" });
      }
    },
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (forumId?: string) => {
    try {
      const dataToSubmit = forumId 
        ? { ...formData, forumId }
        : formData;

      const validatedData = postOnForumSchema.parse(dataToSubmit);
      setErrors({});
      
      await postOnForumMutation.mutateAsync(validatedData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce(
          (acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          },
          {} as Record<string, string>
        );
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleInputChanges,
    isPending: postOnForumMutation.isPending,
    errors,
  };
};