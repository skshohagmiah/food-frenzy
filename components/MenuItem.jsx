'use client'
import { useCartContext } from "@/context/ContextPovider";
import Image from 'next/image';

const MenuItem = ({ menu }) => {
  const item = JSON.parse(menu);
  const { state, dispatch } = useCartContext();

  const isItemInCart = state.cart.some((cartItem) => cartItem?._id === item._id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, qty: 1 } });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item?._id } });
  };

  return (
    <>
      <div className='flex flex-col relative h-fit gap-2 rounded-md overflow-hidden text-center shadow-lg' style={{ zIndex: '1' }}>
        <div className='relative w-[100%] h-[300px]'>
          <Image src={item?.img} alt='cake' className='w-full h-full' objectFit='cover' layout='fill' />
        </div>
        <h2 className='text-2xl mt-2 font-semibold'>{item?.title} (500gm)</h2>
        <p className='font-bold text-2xl'>$ {item?.price}</p>

        {isItemInCart ? (
          <button
            key={item._id}
            onClick={handleRemoveFromCart}
            className='p-2 m-2 -mb-5 text-xl bg-red-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full'
          >
            Remove From Cart
          </button>
        ) : (
          <button
            key={item._id}
            onClick={handleAddToCart}
            className='p-2 m-2 -mb-5 text-xl bg-orange-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full'
          >
            Add To Cart
          </button>
        )}`
      </div>
    </>
  );
};

export default MenuItem;
