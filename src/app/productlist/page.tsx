"use client"; // Mark this as a Client Component

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import imageUrlBuilder from '@sanity/image-url';
import { IoSearch, IoClose } from 'react-icons/io5'; // Import search and close icons
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button
import { Input } from '@/components/ui/input'; // Import shadcn/ui Input
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination'; // Import shadcn Pagination components

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

  const [products, setProducts] = useState<Product[]>([]); // State for fetched data
  const [filteredProduct, setFilteredProducts] = useState<Product[]>([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [showCart, setShowCart] = useState(false); // Add state for cart visibility
  const [isSearchFocused, setIsSearchFocused] = useState(false); // State for search bar focus

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page

  // Fetch products from Sanity
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
      setFilteredProducts(result); // Initialize filtered products with all products
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on search query
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if query is empty
    }
    setCurrentPage(1); // Reset to first page after search
  };

  // Clear search query
  const clearSearchQuery = () => {
    setSearchQuery("");
    setFilteredProducts(products); // Reset to all products
    setCurrentPage(1); // Reset to first page after clear
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProducts = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

        {/* Search Bar */}
        <div className="flex justify-center my-4">
          <div
            className={`relative w-full max-w-md ${
              isSearchFocused ? "border-blue-500" : "border-gray-300"
            } border rounded-lg transition-all duration-200`}
          >
            <div className="flex items-center">
              {/* Search Icon */}
              <IoSearch className="text-gray-500 ml-3" size={20} />
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 focus:outline-none rounded-lg border-none"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {/* Clear Button (Visible when search query is not empty) */}
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearchQuery}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <IoClose size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-10 md:px-20 sm:col-auto py-4 p-3">
          <div className="flex flex-wrap gap-4 md:text-lg">
            <Button variant="outline">Category</Button>
            <Button variant="outline">Product type</Button>
            <Button variant="outline">Price</Button>
            <Button variant="outline">Brand</Button>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-lg mt-4 md:mt-0">
            <span>Sorting by:</span>
            <Button variant="outline">Date added</Button>
          </div>
        </div>

        {/* Product Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10 md:px-20 py-8">
          {paginatedProducts.map((product) => {
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

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* View Collection Button */}
        <div className="flex justify-center mt-4 py-4">
          <Button variant="outline">View Collection</Button>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Page;