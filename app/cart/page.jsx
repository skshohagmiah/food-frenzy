"use client";
import { useCartContext } from "@/context/ContextPovider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";


const CartPage = () => {
  const {state, dispatch } = useCartContext();
  const session = useSession();
  const router = useRouter();
  const cart = state?.cart

  const shippingFee = 5;
  const { total } = cart?.reduce(
    (accu, item) => {
      accu.total += item.price * item.qty;
      return accu;
    },
    { total: 0 }
  );


  function handleCheckout(){
    if(!session?.data?.user){
      router.push('/signin');
    }
    else{
      alert('Sorry, Checkout functionality have not been implemented yet, because stripe is not available in bangladesh !')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row  w-full items-center justify-between gap-2">
      <div className="w-full">
        <h2 className="m-2 font-semibold text-2xl text-center">
          Your Food Cart
          {cart.length === 0 && <p>NO ITEMS ADDED</p>}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:w-[50rem] mx-auto">
          {cart.map((item) => (
            <div
              key={item?.id}
              className="border flex flex-col justify-between p-4 rounded-md border-gray-300"
            >
              <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src={item?.img}
                  alt={item?.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="font-bold md:text-xl text-center mb-2">
                {item?.title}
              </p>
              <p className="text-center mb-2">${item?.price}</p>
              <div className="flex justify-center items-center gap-2">
                {item?.qty >= 1 && (
                  <FiMinus
                    onClick={() =>
                      dispatch({
                        type: "DECREMENT",
                        payload: { id: item._id },
                      })
                    }
                    size={40}
                    className="bg-gray-200 p-2 rounded-full hover:opacity-50"
                  />
                )}
                <span>{item?.qty}</span>
                <GoPlus
                  onClick={() =>
                    dispatch({ type: "INCREMENT", payload: { id: item._id } })
                  }
                  size={40}
                  className="bg-gray-200 p-2 rounded-full hover:opacity-50"
                />
              </div>
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: { id: item._id },
                  })
                }
                className="block w-full mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-full">
        <div className="md:p-4 shadow-md rounded-md flex flex-col w-[100vw] p-2 md:w-[20rem]  mt-8">
          <h2 className="font-bold text-2xl my-4 text-center">Order Summary</h2>
          <h3 className="text-xl flex justify-between p-2 border-b-2">
            Subtotal: <span className="font-bold">${total}</span>
          </h3>
          <h3 className="text-xl flex justify-between p-2 -mt-2 border-b-2">
            Shipping Fee: <span>${total > 0 && shippingFee}</span>
          </h3>
          <h2 className="text-2xl flex font-semibold mt-4 justify-between p-2 border-b-4">
            Total: <span>$ {total && total + shippingFee}</span>
          </h2>
          <button onClick={handleCheckout} className="p-3 mt-2 text-gray-100 bg-blue-700 rounded-full text-xl m-2 hover:ring-2 hover:bg-transparent hover:text-gray-900 transition-all">
            Checkout
          </button>
          <Link className="text-xs p-2" href="/profile">
            Want to Change Address ?{" "}
            <span className="underline">Click Here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
