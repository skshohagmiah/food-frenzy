'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const RestaurantList = ({ heading }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/restaurant');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.log(error);
        toast.error('Error while fetching restaurants');
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className='mt-10'>
      <h2 className='text-3xl md:text-4xl font-bold text-center mt-6 text-orange-600 italic'>{heading}</h2>
      <p className='text-sm text-center font-light p-2 mb-6'>Visit Our Local Restaurants to Get Discount</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-center h-full">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="flex flex-col relative gap-2 rounded-md overflow-hidden text-center shadow-lg h-[35rem]">
            <div className="relative w-full h-[300px]">
              <Image
                src={restaurant?.image}
                alt={restaurant?.name}
                className="w-full h-full"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <h2 className="text-2xl mt-2 font-semibold">
              {restaurant?.name}
            </h2>
            <p className="font-light p-4 text-xs">{restaurant?.description.slice(0,300)}...</p>
            <Link href={`/restaurant/${restaurant._id}`}
              className="p-2 m-2 -mb-5 text-xl bg-orange-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full"
            >
             More Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
