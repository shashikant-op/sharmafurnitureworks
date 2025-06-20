import React, { useEffect, useState } from "react";
import { CartCard } from "./cartcard";
import { useSelector } from "react-redux";
import { CartSkeleton } from "../loader/cartloader";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "./whatsapp/whatsapp";
export const Cart = () => {
  
  const navigate=useNavigate();
  const { isLoading, error, cartitems, cartCount: itemcount } = useSelector((state) => state.cart);
  const [subtotal, setSubtotal] = useState(0);
 const handleshipping = () => {
    const islogin = localStorage.getItem("token");
    if (islogin) {
      localStorage.setItem("allowcheckout","true");
      navigate("/shipping");
    } else {
      localStorage.setItem("prevlocation","/shipping");
      navigate("/login");
    }
  };
  useEffect(() => {
    const total = cartitems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    setSubtotal(total);
  }, [cartitems]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Section - Cart Items */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : cartitems?.length > 0 ? (
            cartitems.map((item) => (
              <CartCard key={item.product} product={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Right Section - Summary */}
        <div className="w-full md:w-1/3">
        
          {
                cartitems?.length>0 ?(  <div className="bg-gray-100 p-6 rounded-md shadow-md sticky md:top-20">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Subtotal:</span>
                <span className="text-lg font-semibold">₹{subtotal}.00</span>
              </div>
              <button onClick={handleshipping} className="w-full !bg-yellow-400 hover:!bg-yellow-500 text-black font-medium py-3 rounded-full transition duration-200">
                Proceed to Buy ({itemcount} item{itemcount > 1 ? "s" : ""})
              </button>
           <button  className="w-full flex justify-center !bg-green-800 hover:!bg-green-800 text-black font-medium py-3 rounded-full transition duration-200">
                 <WhatsAppButton cartitem={cartitems}/>
              </button>
            </div>
          </div>):("")
              }
        </div>

      </div>
    </div>
  );
};
