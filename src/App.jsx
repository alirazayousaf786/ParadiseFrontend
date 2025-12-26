import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website Layout & Pages
import Layout from "./component/Layout/Layout.jsx"; // capital L
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Service from "./pages/Service.jsx";
import Contact from "./pages/Contact.jsx";
import Whatsapp from "./component/Whatsapp.jsx"; // capital W

// Admin Pages
import Login from "./Admin/pages/Login.jsx"; // folder Admin with capital A
import Dashboard from "./Admin/pages/Dashboard.jsx";
import AddFollower from "./Admin/pages/AddFollower.jsx";
import AddMesairi from "./Admin/pages/AddMesairi.jsx";
import AddCarDecoration from "./Admin/pages/AddCarDecoration.jsx";
import AddBridthday from "./Admin/pages/AddBridth.jsx";
import AddPromotion from "./Admin/pages/PromotionUpdate.jsx";
import AddStage from "./Admin/pages/AddStage.jsx";
import AddCack from "./Admin/pages/AddCack.jsx";
import AddJewelry from "./Admin/pages/AddJewelry.jsx";

import ProtectedRoute from "./Admin/ProtectedRoute.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Website Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 🔐 Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* ⚙️ Admin Panel (WITH Sidebar) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-follower" element={<AddFollower />} />
          <Route path="add-mesairi" element={<AddMesairi />} />
          <Route path="add-cardecoration" element={<AddCarDecoration />} />
          <Route path="add-addbrithday" element={<AddBridthday />} />
          <Route path="add-stage" element={<AddStage />} />
          <Route path="promotion" element={<AddPromotion />} />
          <Route path="add-cack" element={<AddCack />} />
          <Route path="add-jewelry" element={<AddJewelry />} />
        </Route>

      </Routes>

      {/* 📲 WhatsApp Floating Button */}
      <Whatsapp />
    </BrowserRouter>
  );
}

export default App;
