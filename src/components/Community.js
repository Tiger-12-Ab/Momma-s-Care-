import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Community = () => {
  return (
    <section className="bg-ivory text-charcoal py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-pink mb-3">
          Join the Momma’s Circle
        </h2>
        <p className="text-base text-charcoal max-w-xl mx-auto">
          A safe and loving space for moms to connect, share, ask, and support each other.
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-6">
        <p className="text-warmgray text-sm md:text-base">
          Ask questions, share your journey, and support other moms in our caring community forum.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center space-x-6 mb-10">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-charcoal hover:text-pink transition"
          aria-label="Facebook"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-charcoal hover:text-pink transition"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-charcoal hover:text-pink transition"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="text-charcoal hover:text-pink transition"
          aria-label="YouTube"
        >
          <FaYoutube size={24} />
        </a>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href="/questions"
          className="inline-block bg-pink text-ivory px-6 py-3 rounded-lg text-sm font-medium hover:bg-darkpink transition"
        >
          Join the Momma’s Circle
        </a>
      </div>
    </section>
  );
};

export default Community;
