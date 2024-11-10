"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { loginSchema } from "@/utils/validateFields/registerSchema";
import { toast } from "react-hot-toast";

const initialData = {
  username: "",
  password: "",
};

export const useLogin = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginInputField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors((prevErrors) => {
        const { [id]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmission = async () => {
    try {
      // Validate form data
      loginSchema.parse(formData);
      
      setIsLoading(true);
      setErrors({});

      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({
          general: "Invalid username or password",
        });
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      if (result?.ok) {
        toast.success("Login successful!");
        router.push("/home");
        router.refresh();
      }
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
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleSubmission,
    handleLoginInputField,
    errors,
    isLoading,
  };
};