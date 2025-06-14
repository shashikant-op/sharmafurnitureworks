import React from "react";

export const CartSkeleton = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto animate-pulse">
      <h2 className="text-2xl font-semibold mb-6 bg-gray-300 rounded w-40 h-8"></h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Cart items skeleton */}
        <div className="flex-1 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row justify-between items-center bg-gray-200 rounded-md p-4 gap-4"
            >
              {/* Image + details */}
              <div className="flex flex-row w-full md:w-3/5 items-center gap-4">
                <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                <div className="flex flex-col justify-center space-y-2 w-full">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-green-300 rounded w-1/4"></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row justify-between items-center w-full md:w-2/5 gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
                <div className="w-16 h-6 bg-red-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Summary skeleton */}
        <div className="w-full md:w-1/3 bg-gray-200 p-6 rounded-md shadow-md h-48 md:sticky md:top-20 flex flex-col justify-center space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};
