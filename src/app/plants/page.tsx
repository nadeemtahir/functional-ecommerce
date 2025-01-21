"use client"; // Required for Next.js client-side components

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the import path as needed
import Image from "next/image";
import Footer2 from "../components/footer2";
import Navbar from "../components/navbar";
import Link from "next/link";

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

const PlantPotsPage = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlantPotsCategory = async () => {
      try {
        const query = `*[_type == "category" && name == "Plant Pots"] {
          _id,
          name,
          slug,
          "products": *[_type == "product" && references(^._id)] {
            _id,
            name,
            price,
            "imageUrl":image.asset->url
          }
        }[0]`; // [0] ensures only the first matching category is returned

        const plantPotsCategory = await client.fetch(query);
        setCategory(plantPotsCategory);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlantPotsCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>No data found for Plant Pots category.</div>;
  }

  return (
    <div>
      <Navbar setShowCart={() => {}} />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Link key={product._id} href={`/productlist/${product._id}`}>
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default PlantPotsPage;