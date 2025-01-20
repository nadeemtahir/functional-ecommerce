"use client"; // Mark this as a Client Component

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

const Page = () => {
  interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    priceWithoutDiscount: number;
    rating: number;
    ratingCount: number;
    tags: string[];
    sizes: string[];
    image: { asset: { _ref: string } }; // Define the Sanity image object structure
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false); // Add state for cart visibility

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        _id,
        name,
        slug,
        category->{
          _id,
          name
        },
        image,
        price,
        quantity,
        tags,
        description,
        features,
        dimensions {
          height,
          width,
          depth
        }
      }`;
      const result = await client.fetch(query);
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <Navbar setShowCart={setShowCart} /> {/* Pass the actual setShowCart function */}

      {/* Main Section */}
      <div className="p-3">
        {/* Header Image */}
        <div className="mb-4">
          <Image
            src="/images/frame 143.png"
            width={1440}
            height={209}
            alt="Header Image"
            className="w-full h-auto object-cover mt-3 sm:w-full"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-10 md:px-20 sm:col-auto py-4 p-3">
          <div className="flex flex-wrap gap-4 md:text-lg">
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Category
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Product type
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Price
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Brand
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-lg mt-4 md:mt-0">
            <span>Sorting by:</span>
            <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
              Date added
            </button>
          </div>
        </div>

        {/* Product Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10 md:px-20 py-8">
          {products.map((product) => {
            const imageUrl = product.image ? urlFor(product.image).url() : null;

            return (
              <Link key={product._id} href={`/productlist/${product._id}`}>
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="w-full h-[300px] overflow-hidden rounded-md flex items-center justify-center bg-gray-200">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        width={300} // Set a fixed width
                        height={300} // Set a fixed height
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>No Image Available</span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-md font-bold">${product.price}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View Collection Button */}
        <div className="flex justify-center mt-4 py-4">
          <button className="bg-[#F9F9F9] px-6 py-3 text-lg rounded hover:bg-gray-200">
            View Collection
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Page;