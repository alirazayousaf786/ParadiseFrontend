import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const CakeList = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addcake");
        setCakes(res.data);
      } catch (err) {
        console.error("Error fetching cakes:", err);
      }
    };
    fetchCakes();
  }, []);

  const whatsappNumber = "923013000940";

  const handleWhatsAppClick = (cake) => {
    const price = parseFloat(cake.addCakeDescription) || 0;
    const discount = (price * cake.promotionPercentage) / 100;
    const finalPrice = price - discount;

    const message = `Hello! I'm interested in: ${cake.addCakeTitle}\nPrice: Rs ${finalPrice.toFixed(
      0
    )}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Cake Products 
      </h1>

      {cakes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No cakes available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cakes.map((cake) => {
            const originalPrice =
              parseFloat(cake.addCakeDescription) || 0;
            const discount =
              (originalPrice * cake.promotionPercentage) / 100;
            const discountedPrice = originalPrice - discount;

            return (
              <div
                key={cake._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                {/* Cake Image */}
                <div className="w-full h-56 sm:h-64 lg:h-60 overflow-hidden relative">
                  <img
                    src={`http://localhost:5000${cake.imageCakeURL}`}
                    alt={cake.addCakeTitle}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />

                  {cake.promotionPercentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                      {cake.promotionPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Cake Content */}
                <div className="p-4 bg-rose-50">
                  <h3 className="text-lg font-semibold text-rose-600 mb-3 text-center dancing-heading">
                    {cake.addCakeTitle}
                  </h3>

                  {/* Price */}
                  <div className="mb-4 text-center">
                    {cake.promotionPercentage > 0 ? (
                      <>
                        <div className="text-gray-500 line-through text-sm">
                          Rs {originalPrice.toFixed(0)}
                        </div>
                        <div className="text-rose-600 font-bold text-2xl">
                          Rs {discountedPrice.toFixed(0)}
                        </div>
                        <div className="text-green-600 text-xs font-medium">
                          Save Rs {discount.toFixed(0)}!
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-800 font-bold text-2xl">
                        Rs {originalPrice.toFixed(0)}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsAppClick(cake)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md"
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CakeList;
