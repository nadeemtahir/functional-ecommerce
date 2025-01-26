import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaSkype,
    FaTwitter,
    FaPinterestP,
  } from "react-icons/fa";
  import React from "react";
  
  const Footer2 = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 p-6 sm:p-10 text-sm sm:text-base lg:text-lg flex-wrap bg-[#2A254b] text-white px-6 sm:px-14 lg:px-28">
        {/* Column 1: Address details */}
        <div className="sm:flex-1">
          <h1 className="text-lg font-bold mb-2">Avion</h1>
          <p>
            21 New York Street <br />
            New York City <br />
            United States of America <br />
            432 34
          </p>
        </div>
  
        {/* Social Media Links */}
        <div className="sm:flex-1">
          <h1 className="text-lg font-bold mb-2">Social Links</h1>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.skype.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaSkype size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
            >
              <FaPinterestP size={20} />
            </a>
          </div>
        </div>
  
        {/* Column 3: Menu */}
        <div className="sm:flex-1">
          <h1 className="text-lg font-bold mb-4 text-white">Menu</h1>
          <ul className="space-y-2 text-sm text-white">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Recently viewed</li>
            <li>
              <a href="/product" className="hover:underline">
                Popular this week
              </a>
            </li>
            <li>
              <a href="/productlist" className="hover:underline">
                All products
              </a>
            </li>
          </ul>
        </div>
  
        {/* Column 4: Categories */}
        <div className="sm:flex-1">
          <h1 className="text-lg font-bold mb-2">Categories</h1>
          <p>Crockery</p>
          <p>Furniture</p>
          <p>Homeware</p>
          <p>Plant pots</p>
          <p>Chairs</p>
          <p>Crockery</p>
        </div>
  
        {/* Column 5: Our company */}
        <div className="sm:flex-1">
          <h1 className="text-lg font-bold mb-2">Our company</h1>
          <a href="/about">About us</a>
          <p>Vacancies</p>
          <p>Contact us</p>
          <p>Privacy</p>
          <p>Return policy</p>
        </div>
      </div>
    );
  };
  
  export default Footer2;
  