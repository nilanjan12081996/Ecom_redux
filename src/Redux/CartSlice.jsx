import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cartItems[find].cartQuantity += 1;
        toast.info(` ${state.cartItems[find].title} already added, quantity increased`, {
          position: "top-right",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.title} added successfully`, {
          position: "top-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (items) => items.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.title} removed from cart `, {
        position: "top-right",
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
        } else if (state.cartItems[itemIndex].cartQuantity === 1) {
          state.cartItems = state.cartItems.filter(
            (cart) => cart.id !== action.payload.id
          );

          toast.error(`${action.payload.title} removed from cart `, {
            position: "top-right",
          });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error("Cart Cleared", {
        position: "top-right",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalPrice = total;
      state.totalQuantity = quantity;
    },
  },
});

export const { addToCart, deleteItem, decreaseCart, increaseCart, clearCart,getTotal } =
  CartSlice.actions;
export default CartSlice.reducer;
