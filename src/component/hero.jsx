import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from "../assets/mesairi-2.jpg";
import carimg from "../assets/car3.jpg"
import fimg from "../assets/f2.jpg"
import bimg from "../assets/bridthday-1.jpg"
import gimg2 from "../assets/f4.jpg"

const FashionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: carimg,
      title: "Car Decoration",
      subtitle: "Beautiful flower decorations for your special occasions",
      buttonText: "Book Decoration"
    },
    {
      image: image1,
      title: "Wedding Special",
      subtitle: "Make your special day unforgettable with elegant arrangements",
      buttonText: "View Collection"
    },
    {
      image: fimg ,
      title: "Anniversary Gifts",
      subtitle: "Celebrate your love with beautiful flower arrangements",
      buttonText: "Shop Anniversary"
    },
    {
      image: bimg,
      title: "Bridthday ",
      subtitle: "Thoughtful gifts wrapped with love and care",
      buttonText: "Explore Gifts"
    },
    {
      image: gimg2,
      title: "Beautiful Guldasta",
      subtitle: "Fresh and elegant bouquets for every occasion",
      buttonText: "Shop Now"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-rose-50">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
         
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          <div className="absolute " />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="text-center max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-rose-900 mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 4px 20px rgba(225,29,72,0.2)'
                }}
              >
                {slide.title}
              </h1>

              <p
                className="text-xl md:text-2xl lg:text-3xl text-rose-700 mb-10 font-light tracking-wide"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textShadow: '0 2px 10px rgba(225,29,72,0.1)'
                }}
              >
                {slide.subtitle}
              </p>

              <button
                onClick={() => setIsAutoPlaying(false)}
                className="group relative px-10 py-4 text-lg tracking-widest font-light border-2 border-rose-500 text-rose-500 overflow-hidden transition-all duration-500 hover:scale-105"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="absolute inset-0 bg-rose-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {slide.buttonText}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => {
          setIsAutoPlaying(false);
          prevSlide();
        }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 group"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-rose-500/60 backdrop-blur-sm bg-rose-500/10 flex items-center justify-center hover:scale-110 transition">
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-rose-500" />
        </div>
      </button>

      <button
        onClick={() => {
          setIsAutoPlaying(false);
          nextSlide();
        }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 group"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-rose-500/60 backdrop-blur-sm bg-rose-500/10 flex items-center justify-center hover:scale-110 transition">
          <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-rose-500" />
        </div>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
          >
            <div
              className={`h-0.5 transition-all duration-500 ${
                index === currentSlide
                  ? 'w-16 bg-rose-500'
                  : 'w-8 bg-rose-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FashionCarousel;
