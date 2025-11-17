"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-end justify-start overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/dallas.jpg')",
          }}
        />
        {/* Dark overlay with gradient fade from white at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-bold text-white mb-6 opacity-0 animate-fade-in-up whitespace-nowrap">
            Insight. Experience. Results.
          </h1>
          <p className="text-lg md:text-xl font-inter font-bold text-white/80 mb-8 max-w-2xl opacity-0 animate-fade-in-up animation-delay-200">
            Strategic legal counsel for modern businesses at every stage of growth. Paquin Law also maintains a focused niche in complex solar contract and financing disputes.
          </p>
          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <Button
              onClick={scrollToContact}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;

