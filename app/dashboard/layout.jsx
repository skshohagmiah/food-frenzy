import DashboardSidebar from "@/components/DashboardSidebar";
import { getUser } from "@/libs/getUser";
import { User } from "@/models/user";


const DashboardLayout = async({ children }) => {
  const session = await getUser()
  const user = await User.findOne({email:session?.user?.email});
  if(user.role !== 'admin'){
    return <h2 className="text-2xl font-bold text-center p-4">This Page Is Only Available for Admin User</h2>
  }
  return (
    <section className="flex flex-col-reverse md:flex-row m-2 gap-8">
     <DashboardSidebar />
      {children}
    </section>
  );
};

export default DashboardLayout;
