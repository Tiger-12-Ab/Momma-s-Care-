import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-darkpink text-ivory">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row justify-between space-y-12 lg:space-y-0">
        {/* Logo & Tagline */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">Momma's Care</h2>
          <p className="text-ivorycar max-w-xs">
            - a pregnancy tracker & baby care tracker
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/pregnancy" className="hover:underline">
                Pregnancy Tracker
              </a>
            </li>
            <li>
              <a href="/newborn" className="hover:underline">
                Newborn Tracker
              </a>
            </li>
            <li>
              <a href="/nutrition" className="hover:underline">
                Nutrition
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div className="flex-1">
          <h3 className="font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="/questions" className="hover:underline">
                Forums
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-ivorycar">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-ivorycar">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-ivorycar">
                <FaTwitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-ivorycar">
                <FaYoutube size={20} />
              </a>
            </li>
            <li>
              <span className="italic text-ivorycar">Blog (coming soon)</span>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className="flex-1">
          <h3 className="font-semibold mb-4">Get In Touch</h3>
          <p>Email: <a href="mailto:support@mommascare.com" className="hover:underline">support@mommascare.com</a></p>
          <p>Phone: <a href="tel:+880123456789" className="hover:underline">+880-123456789</a></p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivorycar mt-8 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-2 text-center text-ivorycar text-sm">
          <div className="flex space-x-4">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
          </div>
          <div>
            © 2025 Momma's Care - a pregnancy tracker & baby care tracker
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
