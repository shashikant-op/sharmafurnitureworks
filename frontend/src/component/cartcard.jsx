import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync, removeFromCart } from "../redux/cart/cartslice";

export const CartCard = ({ product }) => {
  const dispatch = useDispatch();
  const { product: id, title: name, price, quantity } = product;

  const onQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(addToCartAsync({ id, quantity: newQuantity - quantity }));
  };

  const onDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-md shadow-sm p-4 mb-4 gap-4">
      {/* Image + Details container */}
      <div className="flex flex-row w-full md:w-3/5 items-center gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${id}`}>
            <img
              src={product.image.url}
              alt={name}
              className="w-20 h-20 object-cover rounded-md"
            />
          </Link>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-md font-medium">
            {name.split(" ").slice(0, 8).join(" ")}
            {name.split(" ").length > 8 && "..."}
          </h2>
          <p className="text-sm text-gray-600">₹{price}.00</p>
          <p className="text-sm text-green-600">In stock</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row justify-between items-center w-full md:w-2/5 gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(id, quantity - 1)}
            className="px-3 py-1 !bg-purple-800 text-white rounded-md hover:bg-purple-900 transition"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="px-3 py-1 !bg-purple-800 text-white rounded-md hover:bg-purple-900 transition"
          >
            +
          </button>
        </div>
        <span className="font-semibold text-lg">₹{quantity * price}.00</span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800 ! bg-transparent transition text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
