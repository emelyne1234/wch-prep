"use client";

import CompleteProfilePage from "@/components/auth/CompleteProfilePage";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return {};
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CompleteProfilePage />
    </div>
  );
}
