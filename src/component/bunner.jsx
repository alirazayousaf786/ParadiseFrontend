import { useState } from "react";

const OfferBanner = () => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true); // For hiding banner
  const couponCode = "FLOWER20";

  const copyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!visible) return null; // Hide banner completely

  return (
    <div className="max-w-7xl mx-auto px-5 mt-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transition-all duration-500">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 z-20 text-white text-xl hover:text-white/80 transition"
          title="Close"
        >
          ✕
        </button>

        {/* Decorative Flower */}
        <div className="absolute -top-10 -right-10 text-white/20 text-[160px]">
          🌸
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              🌷 Special Offer!
            </h2>
            <p className="mt-2 text-lg">
              Get <span className="font-semibold underline">20% OFF</span> on your first order
            </p>
            <p className="text-sm text-white/90 mt-1">
              Use coupon code below at checkout
            </p>
          </div>

          {/* COUPON BOX */}
          <div className="bg-white text-rose-600 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-md">
            <span className="font-mono font-bold text-lg tracking-wider">
              {couponCode}
            </span>

            <button
              onClick={copyCoupon}
              className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition"
              title="Copy coupon"
            >
              {/* Copy Icon */}
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* COPIED MESSAGE */}
        {copied && (
          <div className="absolute bottom-4 right-6 bg-white text-rose-600 px-4 py-2 rounded-full text-sm shadow animate-bounce">
            ✅ Coupon Copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferBanner;
