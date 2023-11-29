import DashboardSidebar from "@/components/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
    <section className="flex flex-col-reverse md:flex-row m-2 gap-8">
     <DashboardSidebar />
      {children}
    </section>
  );
};

export default DashboardLayout;
