import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
}

// Helper function to load cart items from local storage
const loadCartFromLocalStorage = (): IProduct[] => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }
  return [];
};

// Helper function to save cart items to local storage
const saveCartToLocalStorage = (cart: IProduct[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
};

// Initialize state from local storage
const initialState: IProduct[] = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart or increase its quantity if it already exists
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex((product) => product.id === action.payload.id);
      if (productIndex === -1) {
        // Add new product with a default quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      } else {
        // Increase the quantity if the product already exists
        state[productIndex].quantity += 1;
      }
      saveCartToLocalStorage(state); // Persist the updated cart to localStorage
    },

    // Remove a product from the cart by its ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedCart); // Persist the updated cart to localStorage
      return updatedCart; // Return the updated cart state
    },

    // Increase the quantity of a product by its ID
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex((product) => product.id === action.payload);
      if (productIndex !== -1) {
        state[productIndex].quantity += 1;
        saveCartToLocalStorage(state); // Persist the updated cart to localStorage
      }
    },

    // Decrease the quantity of a product by its ID
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex((product) => product.id === action.payload);
      if (productIndex !== -1) {
        if (state[productIndex].quantity > 1) {
          // Decrease the quantity if it's greater than 1
          state[productIndex].quantity -= 1;
        } else {
          // Remove the product from the cart if the quantity is 1
          const updatedCart = state.filter((item) => item.id !== action.payload);
          saveCartToLocalStorage(updatedCart); // Persist the updated cart to localStorage
          return updatedCart; // Return the updated cart state
        }
        saveCartToLocalStorage(state); // Persist the updated cart to localStorage
      }
    },

    // Clear the entire cart
    clearCart: () => {
      saveCartToLocalStorage([]); // Clear cart in localStorage
      return []; // Reset cart state
    },
  },
});

// Export actions for use in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;
