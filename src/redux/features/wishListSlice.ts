import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

interface WishlistState {
  items: Product[];
}

// Helper function to safely access localStorage
const loadWishlistFromLocalStorage = (): WishlistState => {
  if (typeof window !== "undefined") {
    try {
      const wishlist = localStorage.getItem("wishlist");
      return wishlist ? { items: JSON.parse(wishlist) } : { items: [] };
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage:", error);
      return { items: [] };
    }
  }
  return { items: [] };
};

const initialState: WishlistState = loadWishlistFromLocalStorage();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      // Ensure `items` is defined and perform the operation
      if (!state.items) {
        state.items = [];
      }
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (!existingProduct) {
        state.items.push(product);
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state.items));
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      // Ensure `items` is defined and perform the operation
      if (state.items) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state.items));
        }
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
