
const ContactPage = () => {
  return (
    <div className="flex p-4 flex-col gap-2 items-center">
      <h2 className="text-4xl text-orange-600 font-semibold">Contact With Us</h2>
      <form action="" className="flex gap-2 flex-col w-full max-w-4xl">
        <label htmlFor="name">Name:</label>
        <input type="text" className="p-2 rounded-md bg-transparent ring-2" name="name" placeholder="Your Name"/>
        <label htmlFor="email"> Email:</label>
        <input type="email" className="p-2 rounded-md bg-transparent ring-2" name="email" placeholder="Your Email"/>
        <label htmlFor="text">Subject:</label>
        <textarea rows='10' cols='10' className="p-2 rounded-md bg-transparent ring-2" placeholder="Subject"></textarea>
        <input type="submit" className="p-2 text-2xl w-[10rem] text-gray-100 hover:ring-2 hover:bg-transparent hover:text-gray-900 bg-orange-500 rounded" value='Send' name="submit"/>
      </form>
    </div>
  )
}

export default ContactPage