
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import showToast from "@/utils/showToast";
import { JoinForum } from "@/services/forum/joinForum";

const joinForumSchema = z.object({
  forumId: z.string().nonempty("Forum ID is required"),
});

export const useJoinForum = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const joinForumMutation = useMutation({
    mutationFn: JoinForum,
    onSuccess: (response) => {
      if (response.message === "Joined Forum successfully") {
        queryClient.invalidateQueries();
        setErrors({});
        showToast(response.message, "success");
      } else {
        showToast(response.message, "error");
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;
        if (errorData.data && Array.isArray(errorData.data)) {
          showToast(errorData.data.join(", "), "error");
        } else {
          showToast(errorData.message, "error");
        }
      } else {
        showToast("An unexpected error occurred.", "error");
      }
    },
  });

  const handleSubmit = (forumId: number) => {
    try {
      joinForumSchema.parse({ forumId: String(forumId) });
      joinForumMutation.mutate({ forumId: String(forumId) });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(fieldErrors);
      }
    }
  };

  return {
    handleSubmit,
    issPending: joinForumMutation.isPending,
    errors,
  };
};
