import { useState } from "react";
import { addToCartAsync } from "../redux/cart/cartslice";
import { store } from "../redux/store";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

function Rightside({ product, perdis }) {
  
   const [quantity, setQuantity] = useState(1);
  const dispatch=useDispatch();
  //addtocart handle
 const handleaddtocart = () => {
  console.log(product._id);
  dispatch(addToCartAsync({ id: product._id, quantity })); 
  toast.success("Item added to cart!");
};
  const maxStock = product?.stock; 
 
  const handleIncrement = () => {
    if (quantity < maxStock) setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  return (
    <div className="flex w-full  lg:w-[62rem] px-3 md:p-1 lg:p-1 sm:pt-2 lg:pl-[2rem] flex-col text-left">
      <span className="text-2xl font-semibold">{product?.title}</span>

      <div className="text-sm flex flex-wrap items-center gap-1 text-gray-600 mt-1">
        <div className="w-full">
          <a href="#" className="text-blue-600 hover:underline">Visit the Storite Store</a>
        </div>
        <div>
          <span>4.2</span>
        <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
        <span className="text-blue-600 underline">{product?.numofreview}</span><br />
        <div className="w-[8.125rem] mt-2 mb-1 px-2 py-1 top-0 text-xs font-semibold text-white bg-yellow-500 rounded">
            50+ Year's Warranty
          </div>
        {/* <span className="text-blue-600 underline">Search this page</span> */}
      </div>
        </div>

      <hr className="w-[15rem] md:w-[25rem] lg:w-[25rem] mt-3 border-t border-gray-600 opacity-40 rounded-full" />
      
      <span className="text-[15px]">{product?.description}</span>
            <hr className="w-[15rem] md:w-[25rem] lg:w-[25rem] mt-3 border-t border-gray-600 opacity-40 rounded-full" />

      <div className="flex flex-col md:flex-col  lg:flex-row mt-2 w-full text-left">

        {/* Left Column - Product Info */}
        <div className=" space-y-4">
          

          {/* <p className="text-sm text-gray-600 mt-1.5">1K+ bought in past month</p> */}

          <div className="flex items-center space-x-3">
            <div className="bg-red-600 text-white mb-0 text-xs px-2 py-1 rounded">
              Limited time deal
            </div>
            <div className="text-red-600 text-xl font-bold">-{perdis}% OFF</div>
            <div className="text-xl font-bold text-gray-900">₹{product?.price.toLocaleString('en-IN')}</div>
          </div>

          <div className="text-sm text-gray-500 mt-0 line-through">
            M.R.P.: {product?.oldpricem || "18,0000"}
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded mr-2">Fulfilled</span>
            Inclusive of all taxes
          </div>

          {/* Offers Section */}
          <div className="p-1">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Offers</h2>
            <div className="flex flex-wrap gap-4">
              <div className="border p-3 bg-linear-90 text-white from-purple-700 to-pink-600 rounded w-44 text-sm">
                <strong>Bank Offer</strong><br />
                Upto ₹1,000.00 discount on select Credit Cards<br />
                <a href="#" className="text-blue-600 text-xs underline">10 offers ›</a>
              </div>
              <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-3 rounded w-44 text-sm">
                <strong>Partner Offers</strong><br />
                Buy 2 or more and get 5% off<br />
                <a href="#" className="text-blue-300 text-xs underline">2 offers ›</a>
              </div>
            </div>
          </div>

          {/* Icons - Warranty etc */}
          <div className="flex flex-wrap gap-6 mt-4 text-xs text-center text-gray-700">
            {["50 Year Warranty", "Free Delivery", "Top Brand", "Secure transaction"].map(item => (
              <div key={item} className="flex flex-col p-auto !items-center w-18">
                <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="description hidden md:block lg:block p-1">
            <h3 className="text-xl text-black">Product Description</h3>
            <span>{product?.description}</span>
          </div>
        </div>

        {/* Right Column - Purchase Box */}
        <div className=" md:border lg:border sm:mt-2 md:mt-3 sm:w-full md:w-full lg:w-[300px]  lg:ml-auto overflow-hidden p-4 !pb-5 rounded-md space-y-3">
          
          <div className="text-2xl font-semibold text-gray-900">
            

            ₹{product?.price.toLocaleString('en-IN')}<sup className="text-sm">00</sup>
          </div>
          <div className="text-sm flex items-center gap-2">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded">Fulfilled</span>
            <span>FREE delivery <strong>Thursday, 24 April</strong></span>
          </div>
          <p className="text-sm text-gray-600">Order within <span className="text-green-700 font-medium">9 hrs 35 mins</span>.</p>
          <p className="text-sm text-gray-700">
            <strong>Delivering to:</strong> Samastipur 848101<br />
            <a href="#" className="text-blue-600 underline">Update location</a>
          </p>
          {
            product?.stock > 0
              ? <p className="text-green-700 font-semibold">In stock</p>
              : <p className="text-red-700 font-semibold">Out of stock</p>
          }
          <p className="text-sm">Payment: <span className="text-gray-600">Secure transaction</span></p>
          <p className="text-sm">Ships from: <strong>Sharma furniture works</strong></p>
          <p className="text-sm">Packaging: Ships in product packaging</p>

          {/* Dropdown & Buttons */}
           <div className="flex items-center space-x-2">
      <button className="px-2 py-1 border rounded text-sm" onClick={handleDecrement}>
        -
      </button>
      <span className="px-3 text-sm">{quantity}</span>
      <button className="px-2 py-1 border rounded text-sm" onClick={handleIncrement}>
        +
      </button>
      <span className="ml-2">Quantity</span>
    </div>

          <button
              onClick={handleaddtocart}
              className={`w-[48%] mr-[4%] md:w-full lg:w-full cursor-pointer text-sm font-medium py-2 rounded 
                          transition-all duration-200 transform 
                          !bg-yellow-400 !text-black 
                          hover:!bg-yellow-500 hover:!text-white hover:scale-105 
                          active:scale-95`}
            >
          Add to Cart
        </button>
          <button 
          className={`w-[48%]  md:w-full  py-2  lg:w-full 
            cursor-pointer text-sm font-medium   transition-all duration-200 transform 
            !bg-orange-500 !text-white 
            hover:!bg-yellow-500 hover:!text-white hover:scale-105 
            active:scale-95
            rounded`}>
            Buy Now</button>
          <button className={`  w-full text-white cursor-pointer
          transition-all duration-200 transform 
              text-sm py-2 rounded 
             !bg-red-400
            hover:!bg-yellow-500 hover:!text-white hover:scale-105 
            active:scale-95`}>Add to Wish List</button>
        </div>
        <hr className="w-full lg:hidden md:hidden mt-3 border-t 
        border-gray-600 opacity-40 rounded-full" />
          <div className="description lg:hidden md:hidden p-1">
            <h3 className="text-xl text-black">Product Description</h3>
            {product && product.specifications.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image.url} alt="Loading" />
                </div>
              );
            })}
          </div>

      </div>
      <ToastContainer/>
    </div>
  );
}
export default Rightside;
