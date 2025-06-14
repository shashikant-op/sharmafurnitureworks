import React from "react";
import Bcard from "./bannerdiscount";
import Featurecard from "./featurecard";

function Banner() {
  return (
    <div 
      className="!w-full h-[88vh] bg-cover bg-center flex  justify-center relative text-white"
      style={{zIndex:0,
        backgroundImage:
          "url('https://www.decoraid.com/wp-content/uploads/2021/04/modern-urban-interior-design-2500x1875.jpeg')",
      }}
    >
      {/* Overlay for darkening */}
      <div className="absolute z-[-1] inset-0 "></div>
      
      <Bcard/>
      <div className=" justify-center flex flex-row flex-nowrap gap-x-3 bg-gradient-to-b from-purple-600/0 to-gray-800 pb-28 p-4 w-full bottom-0 items-end">
  <Featurecard />
  <Featurecard />
  
  <div className="hidden lg:block">
    <Featurecard />
  </div>
</div>

      
      </div>
   
  );
}

export default Banner;
