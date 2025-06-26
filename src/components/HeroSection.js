import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-ivory py-10 px-4 md:px-16">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-pink leading-snug">
            Nurture Every Moment
          </h1>
          <p className="text-lg text-charcoal">
            Your personalized pregnancy and baby care assistant. Track, learn, and grow with confidence.
          </p>
          <div className="flex flex-row justify-center md:justify-start gap-4">

            <Link
              to="/register"
              className="w-fit bg-ivory border border-pink text-pink hover:bg-pink hover:text-ivory px-6 py-3 rounded-xl font-medium transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="w-fit bg-pink text-ivory hover:bg-darkpink px-6 py-3 rounded-xl font-medium transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/Hero.png"
            alt="Mom and baby"
            className="w-full max-w-xs md:max-w-md h-auto max-h-[400px] object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
