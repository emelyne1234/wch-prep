import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonLoader: React.FC = () => (
  <li className="list-group-item">
    <Skeleton className="h-5 w-[150px] mb-2" />
    <Skeleton className="h-4 w-full max-w-[300px]" />
    <Skeleton className="h-[31px] w-[70px] mt-2" />
  </li>
);

export const SkeletonList: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonLoader key={index} />
    ))}
  </>
);