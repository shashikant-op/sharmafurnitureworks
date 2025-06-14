import React from "react";
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import "./card.css"

function Card({product}) {
  const options={
    rating:product.ratings,
    starRatedColor:"tomato",
    numberOfStars:5,
    name:"rating",
    starDimension:"16px",
    starSpacing:"1px"
  }
  const price=80000;
  return (
    <Link 
      to={`/product/${product._id}`}
      className="cardmain p-1 w-[180px] h-[320px] lg:w-[270px] lg:h-[550px] lg:p-2 shadow-md bg-white flex flex-col"
    >
      <div className="  h-[30%] lg:h-[50%] w-full flex items-center justify-center !overflow-hidden">
        <img
          src={product.images[0].url  }
          className="w-full h-full object-cover"
          alt="product"
        />
      </div>

      <div className="h-[30%] flex flex-col  mt-2 ">
        <div className="text-left text-[14px] w-full  flex lg:text-sm flex-wrap  font-medium">
         {product.title.slice(0, 45)}  ...

        </div>
        <div className="flex items-center justify-start text-left">
          <span className="text-[12px] mr-1 mt-[6px]">{product.ratings}</span>
          <StarRatings {...options} />
          <span className="text-[12px] ml-1 mt-[6px]">({product.numofreview})</span>
        </div>  
        <span className="pastbought   text-[12px] lg:text-[14px] flex text-left"> 200+ bought in past month</span>
        <div className="discount mt-1 bg-[#CC0C39] rounded-[2px] w-[100px] lg:w-[130px] text-white text-[12px] lg:text-[14px]">Limited time deal</div>
        <div className="">
          <div className="start-0 flex flex-wrap">
          <div className="text-[18px] lg:text-[28px] price">
          &#8377; {product.price}
          </div>
         <div className="priceoff text-[12px]  lg:text-[14px]  pb-1 ml-1 mt-auto">M.R.P.:&#8377; <span className="line-through">90000</span> <span>(20% off)</span></div>
          </div>
          
          <div className="flex mt-1 lg:mt-3 ml-1 items-center">
          <button className="p-2 rounded-2xl px-4 font-thin text-[12px] !bg-yellow-300">Add to cart</button>
          </div>
          </div>
        
      </div>
    </Link>
  );
}

export default Card;
