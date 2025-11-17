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
      className="relative h-screen flex items-center justify-center overflow-hidden"
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
          style={{
            backgroundImage: "url('/office.jpg')",
          }}
        />
        {/* Subtle forest green/warm neutral overlay */}
        <div className="absolute inset-0 bg-[#2d4a2d]/20" />
      </div>

      {/* Content - White Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto opacity-0 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-bold text-foreground mb-6">
            Insight. Experience. Results.
          </h1>
          <p className="text-lg md:text-xl font-inter font-bold text-foreground/90 mb-8 max-w-2xl">
            Strategic legal counsel for modern businesses at every stage of growth. Paquin Law also maintains a focused niche in complex solar contract and financing disputes.
          </p>
          <Button
            onClick={scrollToContact}
            className="mt-4"
          >
            Contact Us
          </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;

