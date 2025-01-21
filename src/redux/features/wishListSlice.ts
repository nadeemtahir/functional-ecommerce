import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string; // Ensure this matches the payload
}

interface WishlistState {
  items: Product[];
}

// Helper function to safely access localStorage
const loadWishlistFromLocalStorage = (): WishlistState => {
  if (typeof window !== "undefined") {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : { items: [] };
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
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (!existingProduct) {
        state.items.push(product);
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state));
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;