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
      className="relative h-screen flex items-center justify-start overflow-hidden"
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
            backgroundImage: "url('/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start pl-4 sm:pl-6 lg:pl-8 pb-20 md:pb-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 whitespace-nowrap tracking-tight opacity-0 animate-fade-in-up" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Insight. Experience. Results.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl opacity-0 animate-fade-in-up animation-delay-200 leading-relaxed">
            Strategic legal counsel for modern businesses at every stage of growth. Paquin Law also maintains a focused niche in complex solar contract and financing disputes.
          </p>
          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <Button
              onClick={scrollToContact}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm rounded-none px-8 py-3 font-medium"
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

