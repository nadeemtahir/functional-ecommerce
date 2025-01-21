"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Brand from "@/app/components/brand";
import Club from "@/app/components/club";
import Footer2 from "@/app/components/footer2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishListSlice";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingBasket } from "react-icons/fa";
import Navbar from "@/app/components/navbar";

// Image URL Builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Dimensions {
  height?: string;
  width?: string;
  depth?: string;
}

interface Review {
  name: string;
  text: string;
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: any;
  features?: string[];
  dimensions?: Dimensions;
  quantity?: number;
  tags?: string[];
  category?: {
    _id: string;
    name: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const dispatch = useDispatch();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          price,
          description,
          image,
          features,
          dimensions,
          quantity,
          tags,
          category->{
            _id,
            name
          }
        }`;
        const product = await client.fetch(query, { id });

        if (!product) {
          throw new Error("Product not found");
        }

        setProduct(product);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Load saved reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]);

  // Handle review input change
  const inputComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // Handle name input change
  const inputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handle rating selection
  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  // Handle review submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0 || !name.trim()) {
      alert("Please add your name, a review, and a rating.");
      return;
    }

    const newReview: Review = { name, text: comment, rating };
    const updatedReviews = [...reviews, newReview];

    // Save reviews to localStorage
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    // Update state
    setReviews(updatedReviews);
    setComment("");
    setName("");
    setRating(0);

    alert("Review submitted successfully!");
  };

  // Handle review deletion
  const handleDeleteReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);

    // Update localStorage
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    // Update state
    setReviews(updatedReviews);

    alert("Review deleted successfully!");
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add to Cart function
  const addProductToCart = () => {
    if (!productData) {
      console.error("Product data is missing!");
      return;
    }

    // Construct the product object to add to the cart
    const payload = {
      id: Number(productData._id),
      name: productData.name,
      img: urlFor(productData.image).url(),
      price: productData.price,
      quantity: quantity,
    };

    dispatch(addToCart(payload));
    alert("Item added to cart");
  };

  // Add to Wishlist function
  const addProductToWishlist = () => {
    if (!productData) {
      console.error("Product data is missing!");
      return;
    }
    const imageUrl = urlFor(productData.image).url();
    const payload = {
      id: productData._id,
      name: productData.name,
      price: productData.price,
      img: urlFor(productData.image).url(),
    };

    dispatch(addToWishlist(payload));
    alert("Item added to wishlist");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A254B]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!productData) {
    return (
      <div className="text-center py-8 text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        setShowCart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[700px] flex items-center justify-center bg-gray-100">
          <Image
            className="object-cover w-full h-full"
            src={urlFor(productData.image).url()}
            width={721}
            height={759}
            alt={productData.name}
            priority
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 text-[#2A254B] overflow-y-auto">
          <div className="space-y-6">
            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-semibold font-[Clash Display]">
              {productData.name}
            </h1>

            {/* Product Price */}
            <p className="text-lg sm:text-xl font-normal font-[Satoshi] text-[#12131A]">
              ${productData.price}.00
            </p>

            {/* Product Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium font-[Clash Display]">
                Description
              </h2>
              <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
                {productData.description || "Product description goes here."}
              </p>
            </div>

            {/* Product Features */}
            {productData.features && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium font-[Clash Display]">
                  Features
                </h2>
                <ul className="list-disc pl-5 text-sm sm:text-base font-[Satoshi] text-[#505977]">
                  {productData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dimensions */}
            {productData.dimensions && (
              <div className="mb-6">
                <h2 className="text-lg font-medium font-[Clash Display]">
                  Dimensions
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {/* Height */}
                  <div>
                    <p className="text-sm font-[Clash Display]">Height</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.height}cm
                    </p>
                  </div>
                  {/* Width */}
                  <div>
                    <p className="text-sm font-[Clash Display]">Width</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.width}cm
                    </p>
                  </div>
                  {/* Depth */}
                  <div>
                    <p className="text-sm font-[Clash Display]">Depth</p>
                    <p className="text-sm font-[Clash Display]">
                      {productData.dimensions.depth}cm
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {productData.tags && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium font-[Clash Display]">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm text-[#505977]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Category */}
            {productData.category && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium font-[Clash Display]">
                  Category
                </h2>
                <p className="text-sm sm:text-base font-[Satoshi] text-[#505977]">
                  {productData.category.name}
                </p>
              </div>
            )}
          </div>

          {/* Quantity Selector and Add to Cart Button */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md px-3 py-1 bg-[#F9F9F9]">
                <button
                  onClick={decreaseQuantity}
                  className="text-[#CAC6DA] hover:text-[#2A254B]"
                >
                  -
                </button>
                <span className="mx-4 text-[#2A254B]">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="text-[#CAC6DA] hover:text-[#2A254B]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart and Add to Wishlist Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Add to Cart Button */}
              <button
                onClick={addProductToCart}
                className="bg-[#2A254B] text-white px-4 py-2 rounded-md hover:bg-[#1f1b3a] transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <FaShoppingBasket className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              {/* Add to Wishlist Button */}
              <button
                onClick={addProductToWishlist}
                className="bg-[#2A254B] text-white px-4 py-2 rounded-md hover:bg-[#1f1b3a] transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <IoHeartOutline className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10">
            <h1 className="font-semibold text-2xl text-black">Add Reviews</h1>

            {/* Name Input */}
            <Input
              value={name}
              onChange={inputName}
              placeholder="Your name..."
              className="mt-2"
            />

            {/* Review Input */}
            <Input
              value={comment}
              onChange={inputComment}
              placeholder="Write your review..."
              className="mt-2"
            />

            {/* Rating Stars */}
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Submit Review Button */}
            <Button onClick={handleSubmit} className="mt-2">
              Submit Review
            </Button>

            {/* Display Reviews */}
            <div className="mt-5">
              <h1 className="font-semibold text-xl">Customer Reviews</h1>
              {reviews.length === 0 ? (
                <p className="text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="mt-2 p-2 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold">{review.name}</p>
                      <p className="text-lg">{review.text}</p>
                      <div className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <RecommendedProducts />

      <Brand />
      <Club />
      <Footer2 />
    </div>
  );
};

// Extracted Recommended Products Component
const RecommendedProducts = () => {
  const recommendedImages = [
    "/images/parent.png",
    "/images/parent1.png",
    "/images/parent2.png",
    "/images/parent3.png",
  ];

  return (
    <>
      <div className="p-6 sm:p-10">
        <h1 className="text-start py-6 sm:py-10 mt-8 sm:mt-14 text-2xl sm:text-3xl text-[#2A254B]">
          You might also like
        </h1>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-8 justify-center p-6 sm:p-10">
        {recommendedImages.map((src, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/4 flex justify-center"
          >
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
              <Image
                src={src}
                alt={`Recommended product ${index + 1}`}
                width={305}
                height={462}
                className="w-auto h-auto object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetail;