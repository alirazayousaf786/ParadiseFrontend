import { BrowserRouter, Routes, Route } from "react-router-dom";

// Website Layout & Pages
import Layout from "./component/layout/layout.jsx"; 
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import Service from "./pages/Service.jsx";
import Contact from "./pages/Contact.jsx";
import Whatsapp from "./component/whatsapp.jsx"; // capital W

// Admin Pages
import Login from "./admin/pages/Login.jsx"; // folder Admin with capital A
import Dashboard from "./admin/pages/Dashboard.jsx";
import AddFollower from "./admin/pages/AddFollower.jsx";
import AddMesairi from "./admin/pages/AddMesairi.jsx";
import AddCarDecoration from "./admin/pages/AddCarDecoration.jsx";
import AddBridthday from "./admin/pages/AddBridth.jsx";
import AddPromotion from "./admin/pages/PromotionUpdate.jsx";
import AddStage from "./admin/pages/AddStage.jsx";
import AddCack from "./admin/pages/AddCack.jsx";
import AddJewelry from "./admin/pages/AddJewelry.jsx";

import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";

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
