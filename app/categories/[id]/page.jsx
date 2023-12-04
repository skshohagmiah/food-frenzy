import AddToCart from '@/components/AddToCart';
import { Category } from '@/models/category';
import { Menu } from '@/models/menu';
import Image from 'next/image';

const getCategories = async(params) => {
    try {
        const category = await Category.findOne({_id:params?.id})
        const menus = await Menu.find({category:category._id})
        return {category,menus}
    } catch (error) {
        console.log(error)
    }
}


const SingleCategory = async({params}) => {
    const {menus, category} = await getCategories(params);

    

  return (
    <div>
        <h2 className='text-3xl text-orange-600 italic m-4 text-center'>{category?.name} Food</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-item-center gap-8 place-center h-full">
        {menus?.map((cat) => (
          <div key={cat._id} className="flex flex-col relative gap-2 rounded-md overflow-hidden text-center shadow-lg h-[35rem]">
            <div className="relative w-full h-[300px]">
              <Image
                src={cat?.img}
                alt={cat?.name}
                className="w-full h-full"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <h2 className="text-2xl mt-2 font-semibold">
              {cat?.title}
            </h2>
            <p className="font-light p-4 text-xs">{cat?.description.slice(0,300)}...</p>
              <AddToCart item={cat}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleCategory