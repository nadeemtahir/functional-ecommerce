"use client";

import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-7xl animate-bounce" />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-5">Order Successful!</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Thank you for your purchase! Your order has been successfully placed.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all w-full text-lg font-medium"
            onClick={() => router.push("/")}
          >
            Go to Homepage
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition-all w-full text-lg font-medium"
            onClick={() => router.push("/productlist")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;