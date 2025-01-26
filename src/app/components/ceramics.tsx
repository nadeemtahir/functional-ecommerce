"use client"; // Required for Next.js client-side components

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the import path as needed
import Image from "next/image";
import Link from "next/link"; // Import the Link component

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  products: Product[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ChairsPage = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChairsCategory = async () => {
      try {
        const query = `*[_type == "category" && name == "Chairs"] {
          _id,
          name,
          slug,
          "products": *[_type == "product" && references(^._id)] {
            _id,
            name,
            price,
            "imageUrl": image.asset->url
          }
        }[0]`; // [0] ensures only the first matching category is returned

        const chairsCategory = await client.fetch(query);
        setCategory(chairsCategory);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchChairsCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>No data found for Chairs category.</div>;
  }

  return (
    <div className="p-10 w-full pr-4">
      {/* Heading */}
      <div className="p-6 sm:p-10">
        <h1 className="text-start py-6 sm:py-10 mt-8 sm:mt-14 text-2xl sm:text-3xl text-[#2A254B]">
          New Ceramics
        </h1>
      </div>

      {/* Images */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6 sm:gap-8 justify-center p-6 sm:p-10">
        {category.products.map((product) => (
          <Link key={product._id} href={`/productlist/${product._id}`}>
            <div className="w-full sm:w-1/2 lg:w-[320px] flex justify-center"> {/* Increased width to 320px */}
              <div className="relative w-[320px] h-[462px]"> {/* Increased width to 320px */}
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <Link href={"/productlist"}>
      <div className="flex justify-center mt-6">
        <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
          View Collection
        </button>
      </div>
      </Link>
    </div>
  );
};

export default ChairsPage;
