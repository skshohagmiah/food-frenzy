import MapCompnent from "@/components/Map";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { Restaurant } from "@/models/restaurant";
import Image from 'next/image';

const fetchRestaurant = async(params) => {
    try {
        connectToDatabase()
        const restaurant = await Restaurant.findOne({_id:params?.id});

        return restaurant;
    } catch (error) {
        console.log(error)
    }
}

const SingleRestaurant = async({params}) => {
    const restaurant = await fetchRestaurant(params)

  return (
    <div className="flex flex-col items-center gap-4 p-4">
        <h2 className="font-bold text-3xl p-2 text-orange-600 text-center">{restaurant?.name}</h2>
        <div className="relative w-[100%] h-[15rem]  md:w-[90%] md:h-[30rem] rounded-md overflow-hidden">
            <Image className="object-cover" src={restaurant.image} alt={restaurant?.name} fill />
        </div>
        <h3 className="md:w-[80%] text-xs text-center">{restaurant?.description}</h3>
        <h4 className="text-2xl">Address :</h4>
        <address>
            {restaurant?.road},{restaurant.city} ,{restaurant.country}.
        </address>
        <div className="w-full md:w-[90%] h-[20rem] md:h-[40rem] overflow-hidden flex items-center justify-center">{<MapCompnent />}</div>
    </div>
  )
}

export default SingleRestaurant