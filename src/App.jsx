import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/layout/layuot";
import Home from "./pages/Home";
import About from "./pages/about";
import Product from "./pages/product";
import Service from "./pages/service";
import Contact from "./pages/Contact";
import Whatsapp from "./component/whatsapp"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <Whatsapp />
    </BrowserRouter>
  );
}

export default App;
