import React from "react";
import img from "../assets/f3.jpg"
import img1 from "../assets/f2.jpg"
import img2 from "../assets/f5.jpg"
import img3 from "../assets/mesairi-2.jpg"
import img4 from "../assets/car3.jpg"
import img5 from "../assets/bridthday-1.jpg"
import img6 from "../assets/cack1.jpg"

const services = [
  {
    title: "Gift Flowers",
    description:
      "Send love and happiness with our curated gift flower arrangements. Perfect for birthdays, anniversaries, or any special occasion.",
    img: img,
    rate: "Starting at 1000",
  },
  {
    title: "Anniversary Flowers",
    description:
      "Make your anniversaries unforgettable with premium floral arrangements designed to impress your loved one.",
    img: img1,
    rate: "Starting at 2000",
  },
  {
    title: "Birthday Flowers Gift",
    description:
      "Celebrate birthdays with vibrant and fresh flowers. Our birthday bouquets are designed to brighten anyone’s day.",
    img: img2,
    rate: "Starting at 15000",
  },
  {
    title: "Wedding Flowers",
    description:
      "Elegant and luxurious wedding flower arrangements to make your special day magical and memorable.",
    img: img3,
    rate: "Starting at 20000",
  },
  {
    title: "Car Decoration",
    description:
      "Premium floral car decoration for weddings, anniversaries, and special celebrations. Make your car shine with love.",
    img: img4,
    rate: "Starting at 15000",
  },
  {
    title: "Bridthday",
    description:
      "Bring life and freshness to your home with our designer flower arrangements, perfect for any room.",
    img: img5,
    rate: "Starting at 20000",
  },
  {
    title: "Bridthday Cake",
    description:
      "Decorate your rooms with elegance and style using our premium flower bouquets and arrangements.",
    img: img6,
    rate: "Starting at 3000",
  },
];

const Service = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Services 🌸
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-rose-600 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-rose-700 font-bold">{service.rate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Updated Last Section */}
      <div className="mt-16 bg-rose-50 rounded-3xl p-10 shadow-inner">
        <h3 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          Service Cities in Pakistan 🇵🇰
        </h3>

        <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed">
          We proudly provide our flower and decoration services in the following cities:
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-rose-700 font-semibold text-lg">
          <span>Arifwala</span>
          <span>• Pakpattan</span>
          <span>• Islamabad</span>
          <span>• Faisalabad</span>
          <span>• Okara</span>
          <span>• Sahiwal</span>
          <span>• Depalpur</span>
        </div>
      </div>
    </div>
  );
};

export default Service;
