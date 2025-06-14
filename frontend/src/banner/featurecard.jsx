import React from "react";

const Featurecard = () => {
  const images = [
    "https://img.freepik.com/premium-photo/oak-wood-furniture-isolated-white-background_936711-3997.jpg?w=2000",
    "https://th.bing.com/th/id/OIP.OpHVAtm6iHzg2fLtfFS2tgHaE7?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.3AH7sh1xJNxk2UCZXzKRFgHaFO?rs=1&pid=ImgDetMain",
    "https://img.freepik.com/premium-photo/oak-wood-furniture-isolated-white-background_936711-3997.jpg?w=2000",
    "https://th.bing.com/th/id/OIP.OpHVAtm6iHzg2fLtfFS2tgHaE7?rs=1&pid=ImgDetMain",
    "https://img.freepik.com/premium-photo/high-quality-photorealistic-wooden-desk-white-background_899449-239933.jpg",
  ];

  return (
    <div className="flex flex-col justify-between w-[380px] h-[360px] p-1  border border-white/20 shadow-xl bg-white backdrop-blur-md relative overflow-hidden">
      {/* Grainy Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/symphony.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* Title */}
      

      {/* Product Images Grid */}
      <div className="z-10 grid grid-cols-2 gap-1">
        {images.map((src, idx) => (
          <div
            key={idx}
            className=""
          >
            <img
              src={src}
              alt={`Product ${idx + 1}`}
              className="w-full h-24 object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="z-10 mt-4 text-purple-800 text-sm font-semibold hover:underline cursor-pointer">
        See all offers →
      </div>
    </div>
  );
};

export default Featurecard;
