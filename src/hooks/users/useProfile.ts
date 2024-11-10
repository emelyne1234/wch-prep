import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

import { profileData } from "@/services/users/profile";
import showToast from "@/utils/showToast";
import { UpdateprofileInterface } from "@/types/user";

const initialData: UpdateprofileInterface = {
  expertise: "",
  profileImage: "",
  bio: ""
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const [Data, setData] = useState<UpdateprofileInterface>(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateProfileMutation = useMutation({
    mutationFn: profileData,
    onSuccess: (response) => {
      if (response.status === "Success!") {
        queryClient.invalidateQueries({ queryKey: ["User Profile"] });
        setData(initialData);
        setErrors({});
        showToast(response.message, "success");
      } else {
        showToast(response.data.data, "error");
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
    isPending: updateProfileMutation.isPending,
    handleAddressChange,
    removeImage,
    errors,
  };
};
// export const useProfile = () => {
//   const initialFetchPeopleResponse: UsersResponseInterface = {
//     status: "Loading",
//     message: "Loading People...",
//     data: [],
//   };

//   return useQuery({
//     queryKey: ["User Profile"],
//     queryFn: userProfile,
//     initialData: initialFetchPeopleResponse,
//   });
// };
