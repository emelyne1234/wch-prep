import { getAllForums } from "@/services/forum/getforum";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const getAllForumsQuery  = () => {
    const queryClient = useQueryClient();

    const initialData = {
        status: "loading",
        message: "forum retrieved successfully",
        data: []
    }

    return useQuery({
        queryKey: ["all forums"], 
        queryFn: getAllForums, 
        initialData
    })
}