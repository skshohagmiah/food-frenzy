"use client";
export const initialState = {
  total: 0,
  subTotal: 0,
  shippingFee: 0,
  cart: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      const newCart = state.cart.filter(
        (item) => item?._id !== action.payload.id
      );
      return {
        ...state,
        cart: newCart,
      };
    case "INCREMENT":
      const incrementCart = state.cart.map((item) => {
        if (item?._id === action.payload.id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: incrementCart,
      };

    case "DECREMENT":
      const decrementCart = state.cart.map((item) => {
        if (item?._id === action.payload.id) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: decrementCart,
      };

    case "SETSTATE":
      return action.payload;

    default:
      return state;
  }
};
