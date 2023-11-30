import Image from 'next/image'

const About = () => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-4'>
      <div>
      <div className="m-4 p-8 max-w-4xl mx-auto flex flex-col text-center" >
        <h2 className="text-5xl mb-4 text-orange-600 font-semibold">About Us</h2>
        <p className="text-center text-sm ">Welcome to Food Frenzy, your one-stop shop for delicious food. We are passionate about connecting food lovers with amazing restaurants, offering a seamless and enjoyable dining experience. Our app empowers you to explore a world of flavors, from the comfort of your own home.</p>
        <p className="text-center text-sm">Food Frenzy is your guide to a gastronomic adventure. We curate a diverse range of cuisines, ensuring you will find something to tantalize your taste buds. Whether you are craving the familiar comfort of classic dishes or seeking to expand your culinary horizons, Food Frenzy is your key to new and exciting flavors.</p>
    </div>
      </div>
      <div className=' w-[25rem] h-[20rem] md:w-[50rem] rounded-md overflow-hidden md:h-[40rem] relative'>
        <Image src='/about.jpeg' className='rounded-md'  alt='about us' layout='fill' objectFit='contain'/>
      </div>
    </div>

  )
}

export default About