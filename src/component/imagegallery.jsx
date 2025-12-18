import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/f1.jpg"
import img2 from "../assets/f2.jpg"
import img3 from "../assets/f3.jpg"
import img4 from "../assets/f4.jpg"
import img5 from "../assets/f5.jpg"
import img6 from "../assets/f6.jpg"
import img7 from "../assets/f7.jpg"
import img8 from "../assets/f8.jpg"
import img9 from "../assets/f9.jpg"
import img10 from "../assets/f10.jpg"
import img11 from "../assets/cack1.jpg"
import img12 from "../assets/cack2.jpg"
import img13 from "../assets/cack4.jpg"
import img14 from "../assets/m3.jpg"
import img15 from "../assets/m4.jpg"
import img16 from "../assets/mesairi-1.jpg"
import img17 from "../assets/mesairi-2.jpg"
import img18 from "../assets/car3.jpg"
import img19 from "../assets/car4.jpg"
const images = [
 img1,
 img2,
 img3,
 img4,
 img5,
 img6,
 img7,
 img8,
 img9,
 img10,
 img11,
img12,
img13,
img14,
img15,
img16,
img17,
img18,
img19
];

const ImageGallery = () => {
  const galleryRef = useRef(null);

  const scrollLeft = () => {
    galleryRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    galleryRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 relative">
      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-rose-100 transition z-10"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-rose-600" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-rose-100 transition z-10"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-rose-600" />
      </button>

      {/* IMAGE ROW */}
      <div
        ref={galleryRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2"
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Flower ${index + 1}`}
            className="w-40 h-40 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition transform cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
