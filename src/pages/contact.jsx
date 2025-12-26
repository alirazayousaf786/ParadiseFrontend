import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Yahan aap API call kar sakte hain
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold mb-8 transition-colors duration-300"
      >
        <span className="text-2xl">←</span>
        <span>Back to Home</span>
      </button>

      <h2 
        className="text-3xl md:text-4xl font-light text-rose-700 text-center mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Contact Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-rose-600 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Address & Map */}
        <div className="space-y-8">
          {/* Address Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-rose-600 mb-6">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-rose-600 text-2xl mr-4">📍</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">Mission Chowk, Sahiwal, Punjab, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-rose-600 text-2xl mr-4">📞</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+92 300 1234567</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-rose-600 text-2xl mr-4">✉️</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">info@flowershop.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-rose-600 text-2xl mr-4">⏰</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Working Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d73.10614!3d30.66797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b63b2b2b2b2b%3A0x1234567890abcdef!2sMission%20Chowk%2C%20Sahiwal!5e0!3m2!1sen!2spk!4v1234567890123!5m2!1sen!2spk"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mission Chowk Sahiwal Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap" 
        rel="stylesheet" 
      />
    </div>
  );
};

export default Contact;