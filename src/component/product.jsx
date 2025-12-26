import React from "react";
import img from "../assets/f1.jpg";
import img1 from "../assets/f2.jpg";
import img2 from "../assets/f3.jpg";
import img3 from "../assets/f4.jpg";
import img4 from "../assets/f5.jpg";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Gift", img: img, rate: "₹2400" },
  { id: 2, name: "Flower Box", img: img1, rate: "₹1800" },
  { id: 3, name: "Bouquet", img: img2, rate: "₹2200" },
  { id: 3, name: "Bouquet", img: img3, rate: "₹2200" },
  { id: 3, name: "Bouquet", img: img4, rate: "₹2200" },
  
];

const Product = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700">
          Our Products 🌸
        </h1>

        
        <Link to="/product"><button className="px-6 py-3 border-2 border-rose-600 text-rose-600 font-semibold rounded-xl hover:bg-rose-600 hover:text-white transition">
          More Product
        </button></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-52 md:h-64 object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-rose-600 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-700 font-bold">
                {product.rate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
