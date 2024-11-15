import React from 'react';

export const SkeletonLoader: React.FC = () => (
  <div className="skeleton-loader mb-2" style={{ backgroundColor: "#e0e0e0", height: "1.5rem", borderRadius: "4px" }}></div>
);

export const SkeletonList: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonLoader key={index} />
    ))}
  </>
);
