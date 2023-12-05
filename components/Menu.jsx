import { connectToDatabase } from '@/libs/connectToDatabase';
import { Category } from '@/models/category';
import { Menu } from '@/models/menu';
import MenuItem from './MenuItem';



async function fetchMenu(){
try {
  // just imported category modal otherwise get error
  Category
  connectToDatabase()
  const menus = await Menu.find({}).populate('category');
  return menus
} catch (error) {
  console.log(error)
  throw new Error(error)
}
}

const MenuPage = async({heading}) => {

  const menus = await fetchMenu();

  return (
    <>
    <h3 className='text-2xl text-center mt-8'>Our Menu</h3>
    <h2 className='text-3xl md:text-4xl text-center m-2 font-semibold text-orange-600 italic'>{heading}</h2>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8'>
        {menus.map((item) => (
          <MenuItem key={item._id} menu={JSON.stringify(item)} />
        ))}
    </div>
    </>
  )
}

export default MenuPage