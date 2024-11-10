"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import showToast from "@/utils/showToast";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/users/register";
import {
  registerSchema,
  RegisterSchema,
} from "@/utils/validateFields/registerSchema";
import { z } from "zod";

const initialData = {
  email: "",
  username: "",
  password: "",
};

export const useAddUsers = () => {
  const router = useRouter();
  const [formData, setformData] = useState<RegisterSchema>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const addUsersMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (response) => {
      if (response.message === "Successfully registered") {
        queryClient.invalidateQueries();
        setformData(initialData);
        setErrors({});
        showToast(response.message, "success");
        router.push("/profile");
      } else {
        showToast(response.message, "error");
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.data && Array.isArray(errorData.data)) {
          showToast(errorData.data.join(", "), "error");
        } else {
          showToast("An unexpected error occurred.", "error");
        }
      } else {
        showToast("An unexpected error occurred.", "error");
      }
    },
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      registerSchema.parse(formData);
      addUsersMutation.mutate(formData);
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
    formData,
    setformData,
    handleSubmit,
    handleInputChanges,
    isPending: addUsersMutation.isPending,
    errors,
  };
};
