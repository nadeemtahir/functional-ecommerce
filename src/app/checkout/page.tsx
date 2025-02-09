"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer2 from "../components/footer2";
import Navbar from "../components/navbar";
import { client } from "@/sanity/lib/client";

const Checkout = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.cartReducer);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "Credit Card",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    paymentMethod: string;
  }

  interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    img: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setModalMessage("❌ Your cart is empty!");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      const order = await client.create({
        _type: "order",
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        paymentMethod: formData.paymentMethod,
        orderStatus: "pending",
        createdAt: new Date().toISOString(),
        items: cartItems.map((item: CartItem) => ({
          _type: "orderItem",
          productId: item.id ? String(item.id) : "unknown",
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      setModalMessage("🎉 Order Placed Successfully!");
      setTimeout(() => router.push("/success"), 2000);
    } catch (error) {
      setModalMessage("❌ Order Submission Failed. Please Try Again.");
    } finally {
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar setShowCart={() => {}} />
      <div className="max-w-6xl mx-auto p-6 flex flex-wrap gap-6 justify-center">
        <div className="w-full md:w-2/5 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                  <Image src={item.img} alt={item.name} width={80} height={80} className="rounded-md" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="w-full md:w-2/5 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              key !== "paymentMethod" ? (
                <input
                  key={key}
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              ) : null
            ))}
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full p-3 border rounded-lg">
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <button type="submit" disabled={loading} className="w-full bg-[#2A254B] text-white py-3 rounded-lg hover:bg-[#1f1b3a] transition">
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
            <button onClick={() => setShowModal(false)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              OK
            </button>
          </div>
        </motion.div>
      )}

      <Footer2 />
    </div>
  );
};

export default Checkout;
