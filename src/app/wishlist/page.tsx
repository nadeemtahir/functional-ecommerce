"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeFromWishlist } from "@/redux/features/wishListSlice";
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
  const wishlistItems = useSelector((state: RootState) => state.wishlistReducer.items);
  

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div>
      <Navbar
        setShowCart={() => {
          // Implement cart functionality if needed
        }}
      />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p className="text-gray-600">
            Your wishlist is empty.{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Continue shopping
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product: Product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 mb-4">
                  {product.img ? (
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback image if the product image fails to load
                        e.currentTarget.src = "/images/fallback-image.jpg";
                      }}
                    />
                  ) : (
                    // Fallback UI if no image is provided
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

                {/* Product Price */}
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove from Wishlist
                </button>
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