import React from 'react';


import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Community from "../components/Community";
import DownloadApp from "../components/DownloadApp";
import NewsLetterCTA from "../components/NewsLetterCTA";

function Home () {
  

  return (
    <div className="bg-ivory">
      <HeroSection />
      <Features />
      <Community />
      <DownloadApp />
      <NewsLetterCTA />

    </div>
  );
}

export default Home ;