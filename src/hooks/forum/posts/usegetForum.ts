"use client";

import { getpostOnForum } from "@/services/forum/posts/getPostsForum";

import { useQuery } from "@tanstack/react-query";
// import { Post } from "@/types/post";
// import { getpostOnForum } from "@/services/forum/posts/getPostsForum";

// interface UseForumPostsOptions {
//   enabled?: boolean;
//   onSuccess?: (data: Post[]) => void;
//   onError?: (error: Error) => void;
//   refetchInterval?: number | false;
// }

// export const useForumPosts = (forumId: string, options: UseForumPostsOptions = {}) => {
//   const {
//     enabled = true,
//     onSuccess,
//     onError,
//     refetchInterval = false
//   } = options;

//   const query = useQuery({
//     queryKey: ["forumPosts", forumId],
//     queryFn: async () => {
//       try {
//           const data = await getpostOnForum(forumId);
//           if (onSuccess) onSuccess(data);
        
//         return data;
//       } catch (error) {
//         console.log("forumId=++++", error)

//         if (onError) onError(error as Error);
//         throw error;
//       }
//     },
//     enabled: Boolean(forumId) && enabled,
//     refetchInterval,
//   });

//   return {
//     posts: query.data,
//     isLoading: query.isLoading,
//     isError: query.isError,
//     error: query.error,
//     refetch: query.refetch,
//     isFetching: query.isFetching,
//   };
// };



export const usegetForumPosts = (forumId: string) => {
    const { data, isFetching, isError, error, isLoading} = useQuery({
      queryKey: ["forumPosts", forumId],
      queryFn: () => getpostOnForum(forumId)
    });

    return {
      posts: data ?? [],
      isFetching,
      isError,
      error,
      isLoading
    };
  };