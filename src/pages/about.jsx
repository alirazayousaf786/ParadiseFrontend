import React from "react";
import founderImg from "../assets/cliebt.jpg"; // Replace with actual image path

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        About Pardesi Flower 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT - Founder Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={founderImg}
            alt="Founder"
            className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border-4 border-rose-100"
          />
        </div>

        {/* RIGHT - Description */}
        <div className="text-gray-700 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-600">
            Our Founder: Muhammad Shahid yar
          </h2>
          <p className="text-lg md:text-xl leading-relaxed">
            Pardesi Flower Shop was founded with a simple yet passionate mission: to bring beauty, freshness, and love into every home, celebration, and special moment. 🌷  
            <br /><br />
            With years of experience in floristry, Shahid envisioned a shop where premium quality flowers meet exceptional design and timely delivery. Our team curates the finest blooms for anniversaries, weddings, car decorations, and more.  
            <br /><br />
            Every bouquet is crafted with attention to detail, creativity, and dedication to make your moments unforgettable. From classic roses to exotic arrangements, Pardesi Flower Shop is your trusted partner in spreading joy and love.  
          </p>
          <button className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 shadow-lg transition transform hover:-translate-y-1">
            Explore Our Shop
          </button>
        </div>
      </div>

      {/* Optional Mission Section */}
      <div className="mt-16 bg-rose-50 rounded-3xl p-10 shadow-inner">
        <h3 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          Our Mission
        </h3>
        <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed">
          To deliver fresh, premium-quality flowers with love, creativity, and care, making every occasion a memorable celebration.  
          <br />  
          Pardesi Flower Shop is more than just a florist — it's a promise of joy, elegance, and unforgettable experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
