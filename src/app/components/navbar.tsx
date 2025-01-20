"use client";
import Link from "next/link";
import { IoSearch, IoClose } from "react-icons/io5"; // Import IoClose for close icon
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md"; // Hamburger Menu
import { useState } from "react"; // Import useState hook
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useSelector } from "react-redux"; // Redux selector for cart state
import { RootState } from "@/redux/store"; // Root state type for Redux

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
  const cartCount = useSelector((state: RootState) => (state.cartReducer as any[]).length);

  // Navigation links for mobile and desktop
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ceramics", label: "Ceramics" },
    { href: "/product", label: "Popular" },
    { href: "/about", label: "About" },
    { href: "/crockery", label: "Crockery" },
    { href: "/tableware", label: "Tableware" },
    { href: "/cutlery", label: "Cutlery" },
  ];

  return (
    <header className="max-w-[1440px] h-[132px] flex flex-col items-center bg-white px-10 lg:w-full mx-auto relative">
      {/* Top bar: Search, Logo, Cart/Profile */}
      <div className="lg:flex hidden border-b-[0.5px] border-[#0000004f] h-1/2 w-full mx-auto justify-between items-center">
        {/* Search Bar and Icon - Moved to the right */}
        <div className="flex items-center gap-4">
          {/* Logo - Always centered */}
          <h1 className="text-[#22202E] text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
            Avion
          </h1>

          {/* Search Bar and Icon */}
          <div className="flex items-center ml-auto">
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
        </div>

        {/* Cart and Profile Icons */}
        <div className="flex text-xl gap-3 sm:gap-x-1">
          <div className="flex gap-6 text-[26px]">
            {/* Cart Icon with Redux Count */}
            <motion.div
              className="relative cursor-pointer text-black"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href={"/cart"}>
                <div onClick={() => setShowCart(true)}>
                  <MdOutlineShoppingCart />
                  {cartCount > 0 && (
                    <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                      {cartCount}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Profile Icon */}
            <Link href="/">
              <CgProfile />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navbar - Only h1, Search Icon, and Hamburger */}
      <div className="lg:hidden flex w-full justify-between items-center h-1/2">
        <h1 className="text-[#22202E] text-2xl font-semibold">Avion</h1>
        {/* Mobile Search Icon */}
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleSearchBar}
          className="cursor-pointer"
        >
          {showSearchBar ? <IoClose className="text-xl" /> : <IoSearch className="text-xl" />}
        </motion.div>
        <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>

      {/* Mobile Search Bar */}
      {showSearchBar && (
        <div className="lg:hidden w-full p-2">
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
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg p-4 mt-2 z-10">
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
      <div className="lg:flex hidden sm:hidden w-full justify-center items-center h-1/2 text-[#726E8D]">
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