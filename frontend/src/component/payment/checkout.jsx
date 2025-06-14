import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate=useNavigate();
  
  useEffect(()=>{
      const allowcheckout=localStorage.getItem("allowcheckout");
      // const productlist=localStorage.getItem("productlength");
      if(!allowcheckout){
        navigate("/cart");
      }else{
        localStorage.removeItem("allowcheckout");
      }
  },[])
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "card",
  });

  const [order] = useState({
    items: [
      { name: "Wooden Chair", qty: 2, price: 1500 },
      { name: "Study Table", qty: 1, price: 4500 },
    ],
    shipping: 200,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.qty, 0) + order.shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed!");
    console.log("Order Details:", details, "Total:", totalAmount);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 p-6 max-w-6xl mx-auto">
      {/* Details Form */}
      <form onSubmit={handleSubmit} className="flex-1 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" type="text" placeholder="Full Name" value={details.fullName} onChange={handleChange} className="input" required />
          <input name="email" type="email" placeholder="Email" value={details.email} onChange={handleChange} className="input" required />
          <input name="address" type="text" placeholder="Address" value={details.address} onChange={handleChange} className="input" required />
          <input name="city" type="text" placeholder="City" value={details.city} onChange={handleChange} className="input" required />
          <input name="state" type="text" placeholder="State" value={details.state} onChange={handleChange} className="input" required />
          <input name="zip" type="text" placeholder="ZIP Code" value={details.zip} onChange={handleChange} className="input" required />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="paymentMethod" value="card" checked={details.paymentMethod === "card"} onChange={handleChange} className="mr-2" />
            Credit/Debit Card
          </label>
          <label className="flex items-center">
            <input type="radio" name="paymentMethod" value="cod" checked={details.paymentMethod === "cod"} onChange={handleChange} className="mr-2" />
            Cash on Delivery
          </label>
        </div>

        <button type="submit" className="mt-6 !bg-purple-600 !text-white py-2 px-4 rounded hover:!bg-purple-700 transition">
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="space-y-3">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.qty}x {item.name}</span>
              <span>₹{item.qty * item.price}</span>
            </li>
          ))}
          <li className="flex justify-between mt-4">
            <span>Shipping</span>
            <span>₹{order.shipping}</span>
          </li>
          <li className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
