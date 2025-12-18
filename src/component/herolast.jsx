import React from 'react';
import { Gift, Heart, Cake, Car } from 'lucide-react';

const GiftingGrid = () => {
  const giftCategories = [
    {
      id: 1,
      title: "Anniversary Special",
      description: "Celebrate your love with beautiful flower arrangements",
      image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&h=800&fit=crop&q=80",
      icon: Heart,
      color: "rose"
    },
    {
      id: 2,
      title: "Perfect Gifts",
      description: "Thoughtful gifts wrapped with love and care",
      image: "https://images.unsplash.com/photo-1606800059160-4c5c3b0e3e0a?w=1200&h=800&fit=crop&q=80",
      icon: Gift,
      color: "pink"
    },
    {
      id: 3,
      title: "Birthday Celebration",
      description: "Make their special day memorable with our arrangements",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200&h=800&fit=crop&q=80",
      icon: Cake,
      color: "rose"
    },
    {
      id: 4,
      title: "Car Decoration",
      description: "Beautiful flower decorations for your special occasions",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&h=800&fit=crop&q=80",
      icon: Car,
      color: "pink"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {giftCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent transform transition-transform duration-500 group-hover:translate-y-0">
                  <h3 
                    className="text-lg sm:text-xl font-light text-white mb-1 tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {category.title}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm text-white/90 font-light tracking-wide mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {category.description}
                  </p>
                  
                  {/* Shop Now Button */}
                  <button className="px-4 py-1.5 border border-white/60 text-white text-xs tracking-widest font-light rounded-full backdrop-blur-sm bg-white/10 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:border-rose-500 transition-all duration-300 delay-150"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    SHOP NOW
                  </button>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap" 
        rel="stylesheet" 
      />

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GiftingGrid;