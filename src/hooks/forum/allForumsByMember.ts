import { getAllForumsByMember } from "@/services/forum/getForumByMember";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const getAllForumsByMemberQuery  = () => {
    const queryClient = useQueryClient();

    const initialData = {
        status: "loading",
        message: "retrieved successfully",
        data: []
    }

    return useQuery({
        queryKey: ["all forumsMember"], 
        queryFn: getAllForumsByMember, 
        initialData
    })
}