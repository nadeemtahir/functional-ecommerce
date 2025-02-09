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
    console.log("🛒 Cart Items before submitting:", cartItems);
    
    try {
      // Validate cart items
      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

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
          productId: item.id?.toString() || "unknown", // Prevents null issue
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });
  
      console.log("✅ Order stored in Sanity:", order);
      setModalMessage("🎉 Order Placed Successfully!");
    } catch (error: any) {
      console.error("❌ Sanity Order Submission Error:", error.response || error.message);
      setModalMessage("❌ Order Submission Failed. Please Try Again.");
    }
  
    setShowModal(true);
  };
  
  return (
    <div>
      <Navbar setShowCart={() => {}} />
      <div className="min-h-screen bg-gray-50 p-10 flex gap-10 justify-center">
        <div className="w-2/5 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
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
        </div>

        <div className="w-2/5 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
            <div className="flex gap-4">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-1/2 p-3 border rounded-lg" required />
              <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="w-1/2 p-3 border rounded-lg" required />
            </div>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full p-3 border rounded-lg">
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <button type="submit" className="w-full bg-[#2A254B] text-white py-3 rounded-lg hover:bg-[#1f1b3a]">Place Order</button>
          </form>
        </div>
      </div>

      {showModal && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
            <button onClick={() => router.push("/order-success")} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">OK</button>
          </div>
        </motion.div>
      )}

      <Footer2 />
    </div>
  );
};

export default Checkout;
