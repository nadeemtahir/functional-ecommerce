"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/features/cartSlice";
import { FaTrash } from "react-icons/fa";
import Footer2 from "../components/footer2";
import Link from "next/link";
import Navbar from "../components/navbar";
import { MdSwipeUpAlt } from "react-icons/md";
import { motion } from "framer-motion";

const Cart = () => {
  const products = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (id: number) => {
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

  const handleConfirm = () => {
    setShowModal(false);
    setSuccess(true);
  };

  const handleRedirect = () => {
    setSuccess(false);
    router.push("/checkout");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Navbar setShowCart={() => {}} />
      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto p-6">
          <h1 className="text-3xl font-bold text-[#2A254B] mb-8">
            Your Shopping Cart
          </h1>

          {products.length > 0 ? (
            <div className="space-y-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="sm:col-span-1 flex justify-center">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <h2 className="text-xl font-semibold text-[#2A254B]">
                      {item.name}
                    </h2>
                  </div>
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
                  <div className="sm:col-span-1 flex flex-col items-end space-y-4">
                    <p className="text-lg font-medium text-[#2A254B]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash className="w-5 h-5 mr-2" /> Remove
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

          <div className="mt-8 flex flex-col items-end space-y-4">
            <div className="flex items-center text-lg font-medium text-[#2A254B]">
              <p>Subtotal:</p>
              <p>£{getTotal().toFixed(2)}</p>
            </div>
            <p className="text-sm text-[#4E4D93]">
              Taxes and shipping are calculated at checkout
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="w-[172px] h-[56px] bg-[#2A254B] text-white rounded-md hover:bg-[#1f1b3a]"
            >
              Go to Checkout
            </button>
          </div>
        </div>
        <Footer2 />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Checkout</h2>
            <p>Are you sure you want to proceed?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Your order has been placed successfully!</h2>
            <button
              onClick={handleRedirect}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
