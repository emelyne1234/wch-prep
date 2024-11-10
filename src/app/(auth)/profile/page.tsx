'use client';

import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // Your fetch logic here
      return {};
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {/* Your profile content */}
    </div>
  );
}