// Footer.js
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
 //footer 
function Footer() {
  return (
    <footer className="w-full  bg-gray-800 text-white  px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between gap-6">

        {/* Company Info */}
        <div className="sm:basis-1/3 w-full">
          <h2 className="text-xl font-bold mb-2">Sharma Furniture Works</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for everything you need. Affordable. Fast. Reliable.
          </p>
        </div>

        {/* Quick Links */}

        {/* footer quick link */}
        <div className="sm:basis-1/3 w-full">
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="sm:basis-1/3 w-full">
          <h3 className="text-md font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
