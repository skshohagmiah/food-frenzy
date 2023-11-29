import MenuItem from './MenuItem';

const Menu = ({heading}) => {
  return (
    <>
    <h3 className='text-2xl text-center mt-8'>Our Menu</h3>
    <h2 className='text-4xl text-center m-2 font-semibold text-orange-600 italic'>{heading}</h2>
    <div className='grid lg:grid-cols-3 gap-4 mt-8'>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
    </div>
    </>
  )
}

export default Menu