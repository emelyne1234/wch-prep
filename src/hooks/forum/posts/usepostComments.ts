"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import showToast from "@/utils/showToast";
import { postComment } from "@/services/forum/posts/postComments";

interface FormData {
  content: string;
  postId: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

// Validation schema
const postOnForumSchema = z.object({
  content: z.string().min(1, "Content is required"),
  postId: z.string().min(1, "Forum ID is required"),
});

const initialData: FormData = {
  content: "",
  postId: "",
};

export const usePostComment = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const postOnForumMutation = useMutation({
    mutationFn: postComment,
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

  const handleSubmit = async (postId?: string) => {
    try {
      const dataToSubmit = postId
        ? { ...formData, postId }
        : formData;

        
        const validatedData = postOnForumSchema.parse(dataToSubmit);
        setErrors({});
      
      await postOnForumMutation.mutate(dataToSubmit);
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