import Join from "@/components/dashboard/Join";
import React from "react";

function page() {
  return (
    <div className="max-w-[90%] mx-auto mt-24">
      <h1 className="blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6">
        Join Project
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Joining a WilfLife conservation Hub is a great way to get involved in
        conservation projects and make a difference in the world.
      </p>
      <Join />
    </div>
  );
}

export default page;
