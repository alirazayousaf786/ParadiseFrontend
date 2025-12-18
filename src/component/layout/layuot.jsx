import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const Layout = () => {
  return (
    <>
      <Header />
      
      {/* Page Content */}
      <main className="min-h-[70vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
