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
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Helper function to save cart items to local storage
const saveCartToLocalStorage = (cart: IProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
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
      const productIndex = state.findIndex((pro) => pro.id === action.payload.id);
      if (productIndex === -1) {
        state.push({ ...action.payload, quantity: 1 }); // Add new product with quantity 1
      } else {
        state[productIndex].quantity += 1; // Increase quantity if product exists
      }
      saveCartToLocalStorage(state); // Save updated cart to local storage
    },

    // Remove a product from the cart by its ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedCart); // Save updated cart to local storage
      return updatedCart; // Return the updated cart state
    },

    // Increase the quantity of a product by its ID
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex((pro) => pro.id === action.payload);
      if (productIndex !== -1) {
        state[productIndex].quantity += 1; // Increase quantity by 1
        saveCartToLocalStorage(state); // Save updated cart to local storage
      }
    },

    // Decrease the quantity of a product by its ID
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex((pro) => pro.id === action.payload);
      if (productIndex !== -1) {
        if (state[productIndex].quantity > 1) {
          state[productIndex].quantity -= 1; // Decrease quantity by 1 (if quantity > 1)
        } else {
          // If quantity is 1, remove the product from the cart
          const updatedCart = state.filter((item) => item.id !== action.payload);
          saveCartToLocalStorage(updatedCart); // Save updated cart to local storage
          return updatedCart;
        }
        saveCartToLocalStorage(state); // Save updated cart to local storage
      }
    },

    // Clear the entire cart
    clearCart: () => {
      saveCartToLocalStorage([]); // Clear cart in local storage
      return []; // Reset cart state
    },
  },
});

// Export actions for use in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;