import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='flex p-2  min-h-full flex-col-reverse md:gap-4 md:flex-row items-center justify-between'>
        <div className='flex flex-2 flex-col gap-8 text-center md:text-left'>
            <h1 className='text-3xl md:text-6xl md:leading-[5rem] font-bold '>Your One-Stop Shop for <br /> <span className='text-orange-600 italic'>Delicious Food</span></h1>
            <p className='md:-mt-6 text-sm'>Food Frenzy is your ultimate food ordering app, designed to fuel your culinary passions. Explore diverse cuisines, discover trending dishes, and order from a vast network of restaurants. Let Food Frenzy be your companion on a journey of gastronomic exploration.</p>
            <div className='flex items-center gap-4 justify-center md:justify-start '>
                <button className='py-3 flex items-center gap-2 text-gray-100 p-4 md:px-12 md:text-xl border-none bg-orange-500 rounded-md hover:border-none hover:ring-2 hover:bg-transparent hover:text-gray-900 transition-all'>Buy Now  <FaArrowRight />
                </button>
                <button className='flex items-center gap-2 py-3 p-4 md:px-12 borde-2 rounded-md hover:bg-orange-500 hover:text-gray-100 transition-all ring-2'>
                    Get More <FaArrowRight />
                </button>
            </div>
        </div>
        <div className='text-center flex-3 relative -z-1 w-[100%] h-[350px] md:w-[2000px] md:h-[600px] grow'>
            <Image src='/hero.png' style={{zIndex:"-1"}} alt='hero image' objectFit='contain' layout='fill'/>
        </div>
    </div>
  )
}

export default Hero