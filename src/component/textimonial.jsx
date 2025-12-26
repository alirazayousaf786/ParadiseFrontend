import React from 'react';
import img from "../assets/image.png"
import img1 from "../assets/image1.png"
import img2 from "../assets/image2.png"
import img3 from "../assets/image3.png"

const testimonials = [
  {
    name: "Sarah Khan",
    message: "Absolutely loved the flower arrangement! Made our anniversary special 🌹",
    img: img  
  },
  {
    name: "Ali Raza",
    message: "Best service ever! My wedding decoration looked amazing thanks to Flower Shop 🌸",
    img: img1  
  },
  {
    name: "Fatima Noor",
    message: "High quality flowers and fast delivery. Highly recommend! 💐",
    img: img2  
  },
  {
    name: "Hassan Ali",
    message: "Creative and beautiful flower designs. Will order again! 🌷",
    img: img3  
  },
];

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-16 mb-16">
      <h2 
        className="text-3xl md:text-4xl font-light text-rose-700 text-center mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-rose-100"
            />
            <p 
              className="text-gray-600 mb-3 text-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.message}
            </p>
            <h4 
              className="text-rose-600 font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.name}
            </h4>
          </div>
        ))}
      </div>

      {/* Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default Testimonial;