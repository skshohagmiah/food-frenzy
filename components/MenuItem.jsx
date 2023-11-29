import Image from 'next/image';

const MenuItem = () => {
  return (
    <>
    <div className='flex flex-col relative h-fit gap-2 rounded-md overflow-hidden text-center shadow-lg' style={{zIndex:'1'}} >
    <div className='relative w-[400px] h-[300px]'>
        <Image   src='/cake.jpg' alt='cake' className='w-full h-full' objectFit='cover' layout='fill'/>
    </div>
    <h2 className='text-3xl mt-2 font-semibold'>Sweety Cake (500gm)</h2>
    <p className='font-bold text-xl'>$ 33.30</p>
    <button className='p-2 m-2 -mb-5 text-xl bg-orange-500 text-gray-100 hover:ring-2 hover:text-gray-900 hover:bg-transparent rounded-full'>Add To Cart</button>
`</div>
</>
  )
}

export default MenuItem