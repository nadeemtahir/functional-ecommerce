"use client";
import Link from "next/link";
import { IoSearch, IoClose, IoHeartOutline, IoHeart } from "react-icons/io5"; // Import icons
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md"; // Hamburger Menu
import { useState } from "react"; // Import useState hook
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useSelector } from "react-redux"; // Redux selector for cart and wishlist state
import { RootState } from "@/redux/store"; // Root state type for Redux
import User from "./clerk"; // Import the User component

// Define iconVariants for motion.div animations
const iconVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.9 },
};

interface HeaderProps {
  setShowCart: (show: boolean) => void; // Add setShowCart as a prop
}

const Header = ({ setShowCart }: HeaderProps) => {
  // State to control menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // State to control search bar visibility
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to toggle the search bar
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Access cart count from Redux
  const cartCount = useSelector((state: RootState) => state.cartReducer?.length || 0);

  // Access wishlist count from Redux
  const wishlistCount = useSelector((state: RootState) => state.wishlistReducer?.items?.length || 0);

  // Navigation links for mobile and desktop
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/productlist", label: "Products" },
    { href: "/ceramics", label: "Ceramics" },
    { href: "/cutlery", label: "Cutlery" },
    { href: "/about", label: "About" },
    { href: "/crockory", label: "Crockory" },
    { href: "/table", label: "Tables" },
    { href: "/plants", label: "Plant Pots" },
    { href: "/chairs", label: "Chairs" },
    { href: "/tableware", label: "Tableware" },
  ];

  return (
    <header className="w-full h-auto flex flex-col items-center bg-white px-4 sm:px-6 lg:px-8 py-4 relative">
      {/* Top bar: Search, Logo, Cart/Profile */}
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-[#22202E] text-2xl font-semibold">Avion</h1>

        {/* Search Bar and Icon */}
        <div className="flex items-center gap-4">
          {showSearchBar ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                autoFocus
              />
              {/* Close Icon */}
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleSearchBar}
                className="cursor-pointer"
              >
                <IoClose className="text-xl" />
              </motion.div>
            </div>
          ) : (
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleSearchBar}
              className="cursor-pointer"
            >
              <IoSearch className="text-xl" />
            </motion.div>
          )}
        </div>

        {/* Cart, Wishlist, Profile, and User Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with Redux Count */}
          <motion.div
            className="relative cursor-pointer text-black"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href={"/cart"}>
              <div onClick={() => setShowCart(true)}>
                <MdOutlineShoppingCart className="text-2xl" />
                {cartCount > 0 && (
                  <div className="absolute top-[-10px] right-[-10px] bg-red-600 w-[20px] h-[20px] rounded-full text-white text-[12px] grid place-items-center">
                    {cartCount}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Wishlist Icon with Redux Count */}
          <motion.div
            className="relative cursor-pointer text-black"
            variants={iconVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href={"/wishlist"}>
              <div>
                {wishlistCount > 0 ? (
                  <IoHeart className="text-red-500 text-2xl" />
                ) : (
                  <IoHeartOutline className="text-2xl" />
                )}
                {wishlistCount > 0 && (
                  <div className="absolute top-[-10px] right-[-10px] bg-red-600 w-[20px] h-[20px] rounded-full text-white text-[12px] grid place-items-center">
                    {wishlistCount}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>

          {/* User Component (Clerk Authentication) */}
          <User />

          {/* Hamburger Menu Icon for Mobile */}
          <MdMenu className="text-2xl cursor-pointer lg:hidden" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearchBar && (
        <div className="w-full p-2 lg:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            autoFocus
          />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg p-4 mt-2 z-10 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[#22202E] text-lg font-medium py-2 px-4 hover:bg-[#f3f4f6] hover:shadow-sm rounded-lg transition-all duration-200"
              onClick={toggleMenu} // Close menu when a link is clicked
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleMenu}
            className="w-full mt-4 text-center text-[#726E8D] text-sm font-medium py-2 hover:text-[#5a526c] transition-colors"
          >
            Close Menu
          </button>
        </div>
      )}

      {/* Desktop Navigation Bar */}
      <div className="hidden lg:flex w-full justify-center items-center py-4">
        <nav className="flex gap-6 justify-center w-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#5a526c] border-b-2 border-transparent hover:border-[#5a526c] pb-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
