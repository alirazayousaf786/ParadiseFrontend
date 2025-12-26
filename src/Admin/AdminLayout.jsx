import Sidebar from "./component/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Right content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
