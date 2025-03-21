import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-40">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Men's Clothing */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">
            MEN'S CLOTHING
          </h4>
          <ul className="space-y-2">
            <li>T-Shirts</li>
            <li>Casual Shirts</li>
            <li>Jeans</li>
            <li>Boxers</li>
            <li>Shorts</li>
            <li>Joggers</li>
            <li>Winterwear</li>
            <li>Ethnic Wear</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Women's Clothing */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">
            WOMEN'S CLOTHING
          </h4>
          <ul className="space-y-2">
            <li>Tops</li>
            <li>Dresses</li>
            <li>Jeans</li>
            <li>Joggers</li>
            <li>Nightwear</li>
            <li>Winterwear</li>
            <li>Ethnic Wear</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Mobile Covers */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">
            MOBILE COVERS
          </h4>
          <ul className="space-y-2">
            <li>All Mobile Covers</li>
            <li>iPhone Covers</li>
            <li>Samsung Covers</li>
            <li>OnePlus Covers</li>
            <li>Realme Covers</li>
            <li>Xiaomi Covers</li>
            <li>Vivo Covers</li>
            <li>Oppo Covers</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">HELP</h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Return & Refund</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">ABOUT</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Corporate Orders</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-yellow-400 text-lg font-bold mb-4">FOLLOW US</h4>
          <ul className="space-y-2">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2025 Bewakoof. All rights reserved. Crafted with ❤️ for the
        style-conscious.
      </div>
    </footer>
  );
};

export default Footer;
