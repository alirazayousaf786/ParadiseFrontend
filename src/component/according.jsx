import { useState } from "react";
import img from "../assets/flex.jpg"
const data = [
  {
    title: "Fresh Flowers Delivered",
    content: "We ensure fresh flowers are delivered on time, keeping your moments special.",
    img: img,
  },
  {
    title: "Custom Arrangements",
    content: "Our expert florists create custom flower arrangements for any occasion.",
    img: img,
  },
  {
    title: "Fast & Reliable Service",
    content: "Experience fast and reliable flower delivery across your city.",
    img:  img,
  },
  {
    title: "Affordable Prices",
    content: "Premium flowers without breaking the bank.",
    img:  img,
  },
];

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* LEFT - Accordion */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-rose-700 mb-4">
          Why Choose Flower Shop
        </h2>

        {data.map((item, index) => (
          <div key={index} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <button
              className="w-full text-left px-6 py-4 bg-rose-50 text-gray-800 font-semibold flex justify-between items-center hover:bg-rose-100 transition"
              onClick={() => toggle(index)}
            >
              {item.title}
              <span className="text-2xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-white text-gray-600 transition">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT - Image */}
      <div className="flex justify-center md:justify-end">
        <img
          src={activeIndex !== null ? data[activeIndex].img : data[0].img}
          alt="Accordion"
          className="w-full max-w-md rounded-2xl shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default AccordionSection;
