import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

const Confirm = () => {
   const navigate = useNavigate();
  const cartdata = useSelector((state) => state.cart.shippinginfo);
  const cartproducts = useSelector((state) => state.cart.cartitems);

 

  useEffect(() => {
   
    const allowcheckout = localStorage.getItem("allowcheckout");
    if (!allowcheckout) navigate("/cart");
  }, []);

  const subtotal = cartproducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 2000;
  const totalpayment = subtotal + shipping;
const handleproceed_payment=()=>{
  const data={
    subtotal,
    shipping,
    totalpayment
  };
  sessionStorage.setItem("orderInfo",JSON.stringify(data));
  navigate("/payment");
}
  return (
    <div className="max-w-6xl mx-auto justify-center items-start px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Left: Shipping Details */}
      <div className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Shipping Details
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between">
              <span>Address:</span>
              <span>{cartdata.address}</span>
            </li>
            <li className="flex justify-between">
              <span>City:</span>
              <span>{cartdata.city}</span>
            </li>
            <li className="flex justify-between">
              <span>State:</span>
              <span>{cartdata.state}</span>
            </li>
            <li className="flex justify-between">
              <span>Pincode:</span>
              <span>{cartdata.pincode}</span>
            </li>
            <li className="flex justify-between">
              <span>Country:</span>
              <span>{cartdata.country}</span>
            </li>
            <li className="flex justify-between">
              <span>Phone:</span>
              <span>{cartdata.phoneno}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-1/3 bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Order Summary
        </h2>
        <ul className="space-y-4 text-gray-700">
          {cartproducts.map((item, index) => (
            <li key={index} className="flex justify-between items-start gap-2">
              <div className="w-2/3 text-gray-800 text-left">
                {item.title.split(" ").slice(0, 10).join(" ")}
                {item.title.split(" ").length > 10 ? "..." : ""}
              </div>
              <div className="w-1/3 text-right text-gray-600 whitespace-nowrap">
                {item.quantity} × ₹{item.price}
              </div>
            </li>
          ))}

          <li className="flex justify-between pt-2 border-t">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </li>
          <li className="flex justify-between font-semibold pt-2 border-t">
            <span>Total</span>
            <span>₹{totalpayment}</span>
          </li>
        </ul>

          <button
          onClick={handleproceed_payment()}
            type="submit"
            className="mt-6 group   px-3 cursor-pointer !bg-purple-700 !text-white w-full py-2 rounded hover:!bg-purple-900 transition"
          >
            <span className="text-xl flex font-semibold flex-row justify-between px-3 items-center gap-x-2 pr-4">
              <span >Proceed</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </button>
      </div>
    </div>
  );
};

export default Confirm;
