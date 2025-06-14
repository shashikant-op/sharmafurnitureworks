import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount); 
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword.trim()}`);
    } else {
      setKeyword('');
      navigate(`/products`);
    }
  };

  return (
    <header className="header sm:!px-2 !pr-3 lg:!px-2 !text-white !bg-purple-700">
      {/* Logo */}
      <div className="header__logo hidden lg:flex items-center">
        <Link  to="/">
          <h2 className="text-2xl font-bold">Opendoor</h2>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="header__nav !text-white">
        <Link to="/products">Products</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Search Bar */}
      <div className="text-gray-600 !items-center bg-white rounded border">
        <form className="mr-0 flex flex-row" onSubmit={onSearch}>
          <input
            className="items-center !px-2 lg:px-1.5 sm:p-0 sm:m-0 md:py-1 lg:py-1 h-8 text-sm border-none rounded-none focus:outline-none focus:ring-0"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            value={keyword}
          />
          <button
            type="submit"
            className="cursor-pointer h-full bg-gray-200 p-[4.5px] sm:px-1.5 rounded-r-sm text-purple-800 ml-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Icons */}
      <div className="header__icons flex flex-row items-center justify-center">
        <div className="header__icon ml-[10px]">
          <Link className='!text-white' to="/login">
            <FaUserCircle size={22} />
          </Link>
        </div>
        <div className="header__icon header__cart relative ml-[10px]">
          <Link className='!text-white' to="/cart">
            <FaShoppingCart size={22} />
          </Link>
          <span className="header__cart-count absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
