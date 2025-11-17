"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = ["#home", "#practice-areas", "#process", "#about", "#contact"];
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

        const navLinks = [
          { name: "Home", href: "#home" },
          { name: "Practice Areas", href: "#practice-areas" },
          { name: "About", href: "#about" },
          { name: "Our Process", href: "#process" },
        ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#home")}
              className="flex items-center space-x-3 transition-colors duration-300"
            >
              <img 
                src="/dark_logo.png" 
                alt="Paquin Law Logo" 
                className="h-12 md:h-16 w-auto"
                style={isScrolled ? {
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(47%) saturate(1234%) hue-rotate(85deg) brightness(95%) contrast(88%)'
                } : {
                  filter: 'brightness(0) invert(1)'
                }}
              />
                    <span className={`text-xl md:text-2xl font-lora font-medium transition-colors duration-300 ${
                      isScrolled ? "text-primary hover:text-primary/80" : "text-white hover:text-white/80"
                    }`}>
                      Paquin Law
                    </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 group ${
                  activeSection === link.href
                    ? isScrolled ? "text-primary" : "text-white"
                    : isScrolled ? "text-gray-500 hover:text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.href ? (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? "bg-primary" : "bg-white"}`} />
                ) : (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? "bg-primary" : "bg-white"} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                )}
              </button>
            ))}
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 group ${
                      activeSection === "#contact"
                        ? isScrolled ? "text-primary" : "text-white"
                        : isScrolled ? "text-gray-500 hover:text-primary" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Contact Us
                    {activeSection === "#contact" ? (
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? "bg-primary" : "bg-white"}`} />
                    ) : (
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? "bg-primary" : "bg-white"} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                    )}
                  </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors p-2 ${isScrolled ? "text-black" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t animate-fade-in ${
          isScrolled 
            ? "bg-white border-gray-200" 
            : "bg-black/90 backdrop-blur-md border-white/20"
        }`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                  activeSection === link.href
                    ? isScrolled ? "text-primary bg-primary/10" : "text-white bg-white/20"
                    : isScrolled ? "text-gray-500 hover:text-primary hover:bg-primary/5" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </button>
            ))}
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                      activeSection === "#contact"
                        ? isScrolled ? "text-primary bg-primary/10" : "text-white bg-white/20"
                        : isScrolled ? "text-gray-500 hover:text-primary hover:bg-primary/5" : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Contact Us
                  </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

