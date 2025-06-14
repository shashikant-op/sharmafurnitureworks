import React from "react";

const ProductHomeLoader = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 animate-pulse bg-white">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-auto bg-white border border-gray-200 rounded-xl shadow"
        >
          <div className="p-3 flex flex-col">
            {/* Image Placeholder */}
            <div className="bg-gray-300 rounded-lg h-36 w-full" />

            {/* Text Placeholder Lines */}
            <div className="bg-gray-300 rounded h-4 mt-4 w-3/4" />
            <div className="bg-gray-300 rounded h-4 mt-2 w-1/4" />
            <div className="bg-gray-300 rounded h-4 mt-2 w-1/2" />
            <div className="bg-gray-300 rounded h-4 mt-2 w-1/4" />
            <div className="bg-gray-300 rounded h-4 mt-2 w-1/4" />
            <div className="bg-gray-300 rounded h-4 mt-2 w-1/2" />

            {/* Button Placeholder */}
            <div className="bg-gray-300 rounded-full h-10 mt-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductHomeLoader;
