"use client"; // Required for Next.js client-side components

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the import path as needed
import Image from "next/image";
import Footer2 from "../components/footer2";
import Link from "next/link"; // Import the Link component
import Navbar from "../components/navbar";

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

const Popular = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTablewareCategory = async () => {
      try {
        const query = `*[_type == "category" && name == "Tableware"] {
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

        const tablewareCategory = await client.fetch(query);
        setCategory(tablewareCategory);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTablewareCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>No data found for Tableware category.</div>;
  }

  // Filter products to include only index 0, 2, and 3
  const filteredProducts = category.products.filter((_, index) => [0, 2, 3].includes(index));

  return (
      <div className="w-full bg-[#ffffff] py-16 mt-16">
        {/* Heading */}
        <h1 className="ml-10 font-[Clash Display] font-normal text-3xl lg:text-4xl text-[#2A254B] mb-20">
          Our Popular Products
        </h1>

        {/* Images Section in one row */}
        <div className="flex flex-row gap-8 justify-center mt-8">
          {filteredProducts.map((product, index) => (
            <Link
              key={product._id}
              href={`/productlist/${product._id}`} // Dynamic link to product page
            >
              <div
                className={`w-full sm:w-1/2 ${
                  index === 0 ? "lg:w-[620px]" : "lg:w-[305px]"
                }`}
              >
                {/* Image Container with Fixed Height */}
                <div className="relative w-full h-[462px]"> {/* Fixed height for all images */}
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link href={"/productlist"}>
        <div className="flex justify-center mt-8">
          <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
            View Collection
          </button>
        </div>
        </Link>
      </div>
  );
};

export default Popular;