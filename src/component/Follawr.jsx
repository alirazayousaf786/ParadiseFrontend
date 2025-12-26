import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addblog");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const whatsappNumber = "923013000940";

  const handleWhatsAppClick = (blog) => {
    // Parse price from paragraph
    const price = parseFloat(blog.addBlogParagraph) || 0;
    const discount = (price * blog.promotionPercentage) / 100;
    const finalPrice = price - discount;
    
    const message = `Hello! I'm interested in: ${blog.addBlogTitle}\nPrice: Rs ${finalPrice.toFixed(0)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-rose-700 text-center mb-12">
        Our Flower Products 
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {blogs.map((blog) => {
            // Calculate prices from paragraph
            const originalPrice = parseFloat(blog.addBlogParagraph) || 0;
            const discount = (originalPrice * blog.promotionPercentage) / 100;
            const discountedPrice = originalPrice - discount;

            return (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                {/* Blog Image */}
                <div className="w-full h-56 sm:h-64 lg:h-60 overflow-hidden relative">
                  <img
                    src={`http://localhost:5000${blog.imageBlogURL}`}
                    alt={blog.addBlogTitle}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  {/* Promotion Badge */}
                  {blog.promotionPercentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                      {blog.promotionPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-4 bg-rose-50">
                  <h3 className="text-lg font-semibold text-rose-600 mb-3 text-center dancing-heading">
                    {blog.addBlogTitle}
                  </h3>

                  {/* Price Section */}
                  <div className="mb-4 text-center">
                    {blog.promotionPercentage > 0 ? (
                      <div className="space-y-1">
                        {/* Original Price (strikethrough) */}
                        <div className="text-gray-500 line-through text-sm">
                          Rs {originalPrice.toFixed(0)}
                        </div>
                        
                        {/* Discounted Price */}
                        <div className="text-rose-600 font-bold text-2xl">
                          Rs {discountedPrice.toFixed(0)}
                        </div>
                        
                        {/* Savings */}
                        <div className="text-green-600 text-xs font-medium">
                          Save Rs {discount.toFixed(0)}!
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-800 font-bold text-2xl">
                        Rs {originalPrice.toFixed(0)}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsAppClick(blog)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      fill="currentColor" 
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Order Now
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

export default BlogList;