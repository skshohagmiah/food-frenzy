"use client";

import { useCartContext } from "@/context/ContextPovider";

const AddToCart = ({item}) => {
  const { state, dispatch } = useCartContext();

  const isItemInCart = state.cart.some(
    (cartItem) => cartItem?._id === item._id
  );

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, qty: 1 } });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: item?._id } });
  };

  return (
    <div className="w-full">
      {isItemInCart ? (
        <button
          key={item?._id}
          onClick={handleRemoveFromCart}
          className="p-2 w-full -mb-5 text-xl bg-red-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full"
        >
          Remove From Cart
        </button>
      ) : (
        <button
          key={item?._id}
          onClick={handleAddToCart}
          className="p-2 w-full -mb-5 text-xl bg-orange-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full"
        >
          Add To Cart
        </button>
      )}
      `
    </div>
  );
};

export default AddToCart;
