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

      // Ensure `items` is defined
      if (!state.items) {
        state.items = [];
      }

      // Check if product already exists in wishlist
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (!existingProduct) {
        state.items.push(product);

        // Update localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("wishlist", JSON.stringify(state.items));
          } catch (error) {
            console.error("Failed to update wishlist in localStorage:", error);
          }
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      // Ensure `items` is defined
      if (state.items) {
        state.items = state.items.filter((item) => item.id !== action.payload);

        // Update localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("wishlist", JSON.stringify(state.items));
          } catch (error) {
            console.error("Failed to update wishlist in localStorage:", error);
          }
        }
      }
    },
    moveToCart: (
      state,
      action: PayloadAction<{ product: Product; dispatch: (action: any) => void }>
    ) => {
      const { product, dispatch } = action.payload;

      // Add product to the cart
      dispatch({ type: "cart/addToCart", payload: product });

      // Remove product from wishlist
      if (state.items) {
        state.items = state.items.filter((item) => item.id !== product.id);

        // Update localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("wishlist", JSON.stringify(state.items));
          } catch (error) {
            console.error("Failed to update wishlist in localStorage:", error);
          }
        }
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, moveToCart } = wishlistSlice.actions;
export default wishlistSlice.reducer;
