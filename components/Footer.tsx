"use client";

import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Practice Areas", href: "#practice-areas" },
    { name: "Our Process", href: "#process" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className={`bg-primary text-white py-12 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src="/dark_logo.png" 
                      alt="Paquin Law Logo" 
                      className="h-8 w-auto"
                    />
                    <h3 className="text-2xl font-lora font-bold">Paquin Law</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Corporate and Technology Law for a Changing World
                  </p>
                </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>New Orleans, LA</p>
              <a
                href="mailto:contact@paquinlaw.com"
                className="block hover:text-white transition-colors duration-300"
              >
                contact@paquinlaw.com
              </a>
              <a
                href="tel:+15551234567"
                className="block hover:text-white transition-colors duration-300"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Paquin Law. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-white/60 text-sm">
                Built with care and
              </span>
              <span className="text-white text-lg">●</span>
              <span className="text-white/60 text-sm">precision</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

