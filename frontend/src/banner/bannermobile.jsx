import React from "react";

function Bannerm() {
  return (
    <div 
      className="!w-full h-[30vh] bg-cover bg-center flex items-center justify-center relative text-white"
      style={{
        backgroundImage:
          "url('https://www.decoraid.com/wp-content/uploads/2021/04/modern-urban-interior-design-2500x1875.jpeg')",
      }}
    >
      {/* Overlay for darkening */}
      <div className="absolute inset-0  bg-purple-800  opacity-20 "></div>

      <div className="relative z-10 text-center px-4 ">
        <h2 className="text-4xl font-bold mb-4">Mega Sale</h2>
        <p className=" bg-purple-700 p-0.5 px-3 rounded-2xl text-lg">Up to <span className="text-yellow-400 font-semibold">60% OFF</span> on all furniture</p>
        <button className="mt-4 cursor-pointer px-6 py-2 bg-white text-black font-semibold rounded hover:!bg-purple-900 hover:border-white hover:text-white transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Bannerm;
