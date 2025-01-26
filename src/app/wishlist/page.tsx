"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeFromWishlist } from "@/redux/features/wishListSlice";
import { addToCart } from "@/redux/features/cartSlice"; // Import addToCart action
import { RootState } from "@/redux/store";
import Image from "next/image";
import Footer2 from "../components/footer2";
import Navbar from "../components/navbar";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlistReducer.items || []);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 })); // Add product to cart with initial quantity
    dispatch(removeFromWishlist(product.id)); // Remove product from wishlist
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        setShowCart={() => {
          // Implement cart functionality if needed
        }}
      />
      <div className="flex-grow p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center mb-6">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Image
              src="/images/wish.jpeg"
              alt="Empty Wishlist"
              width={300}
              height={300}
              className="mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              It looks like you haven’t added anything to your wishlist yet.
            </p>
            <Link
              href="/"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product: Product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                  {product.img ? (
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-gray-500">No Image Available</span>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

                {/* Product Price */}
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>

                  {/* Move to Cart Button */}
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer2 />
    </div>
  );
};

export default WishlistPage;
