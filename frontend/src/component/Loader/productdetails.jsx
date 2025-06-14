import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 animate-pulse bg-white shadow rounded-lg w-full">
      
      {/* Left Side: Image + Thumbnails */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="w-full h-[30vh] md:h-[60vh] bg-gray-300 rounded-lg" />

        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-14 h-14 bg-gray-300 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right Side: Product Info */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-5 bg-gray-300 rounded w-1/2" />
        <div className="h-20 bg-gray-300 rounded w-full" />

        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-6 bg-gray-300 rounded w-1/4" />

        <div className="flex gap-4 mt-4">
          <div className="w-32 h-10 bg-gray-300 rounded" />
          <div className="w-32 h-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
