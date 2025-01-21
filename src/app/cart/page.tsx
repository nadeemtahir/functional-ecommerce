"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/features/cartSlice";
import { FaTrash } from "react-icons/fa";
import Footer2 from "../components/footer2";
import Link from "next/link";
import Navbar from "../components/navbar";

const Cart = () => {
  const products = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true after component mounts
  }, []);

  const handleRemove = (id: number) => {
    console.log("Removing product with ID:", id); // Debug the ID
    dispatch(removeFromCart(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  function getTotal() {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div>
    <Navbar setShowCart={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="text-3xl font-bold font-[Clash Display] text-[#2A254B] mb-8">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        {products.length > 0 ? (
          <div className="space-y-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="sm:col-span-1 flex justify-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>

                {/* Product Name and Description */}
                <div className="sm:col-span-2">
                  <h2 className="text-xl font-semibold text-[#2A254B]">
                    {item.name}
                  </h2>
                  {/* Description is not available */}
                </div>

                {/* Quantity Controls */}
                <div className="sm:col-span-1 flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-lg"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <p className="px-4 py-2 text-lg font-medium">
                      {item.quantity}
                    </p>
                    <button
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-lg"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Remove Button */}
                <div className="sm:col-span-1 flex flex-col items-end space-y-4">
                  <p className="text-lg font-medium text-[#2A254B]">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash className="w-5 h-5 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        )}

        {/* Subtotal Section */}
        <div className="mt-8 flex flex-col items-end space-y-4">
          <div className="flex items-center space-x-2 text-lg font-medium text-[#2A254B]">
            <p>Subtotal:</p>
            <p>£{getTotal().toFixed(2)}</p>
          </div>
          <p className="text-sm text-[#4E4D93]">
            Taxes and shipping are calculated at checkout
          </p>

          {/* Checkout Button */}
          <Link href={"/shipengine"}>
          <button className="w-[172px] h-[56px] bg-[#2A254B] text-white rounded-md hover:bg-[#1f1b3a] transition-colors">
            Go to Checkout
          </button>
          </Link>
        </div>
      </div>
      <Footer2 />
    </div>
    </div>
  );
};

export default Cart;