import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { z } from "zod";

import { profileData } from "@/services/users/profile";
import showToast from "@/utils/showToast";
import { UpdateprofileInterface } from "@/types/user";
import { useRouter } from "next/navigation";

const initialData: UpdateprofileInterface = {
  expertise: "",
  profileImage: "",
  bio: ""
};

export const useUpdateProfile = () => {
  const [Data, setData] = useState<UpdateprofileInterface>(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter()
  

  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: profileData,
    onSuccess: (response) => {
      if (response.message === "Profile updated successfully") {
          queryClient.invalidateQueries();
          setData(initialData);
          setErrors({});
          showToast(response.message, "success");
          router.push("/login");
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

  const handleInputChanges = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const removeImage = () => {
    setData({ ...Data, profileImage: "" });
    setImagePreview(null);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setData((prevState) => ({
      ...prevState
    }));
  };

  const handleSubmit = () => {
    try {
        updateProfileMutation.mutate(Data);
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
    }
};

  return {
    Data,
    setData,
    handleSubmit,
    handleInputChanges,
    isPending: updateProfileMutation.isLoading,
    handleAddressChange,
    removeImage,
    errors,
  };
};
