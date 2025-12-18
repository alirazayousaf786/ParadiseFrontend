const PremiumSection = () => {
    return (
      <section className="relative bg-gradient-to-r from-rose-500 to-pink-500 text-white overflow-hidden mt-16 rounded-t-3xl shadow-xl">
        {/* Decorative SVG */}
        <svg
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.1"
            d="M0,160L48,138.7C96,117,192,75,288,74.7C384,75,480,117,576,144C672,171,768,181,864,176C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
  
        <div className="max-w-7xl mx-auto px-5 py-20 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Go Premium with Flower Shop 🌸
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-sm">
            Experience the finest flower arrangements for every occasion. Fast delivery, fresh flowers, and stunning designs — all in one place.
          </p>
          <button className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:bg-white/90 transition transform hover:-translate-y-1">
            Explore Premium
          </button>
        </div>
  
        {/* Bottom Decorative SVG Curve */}
        <svg
          className="absolute bottom-0 left-0 w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.1"
            d="M0,224L48,197.3C96,171,192,117,288,90.7C384,64,480,64,576,80C672,96,768,128,864,160C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
    );
  };
  
  export default PremiumSection;
  