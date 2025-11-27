"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-inter font-bold text-gray-900 mb-4">
              About Us.
            </h2>
            <div className="w-32 h-1 bg-primary"></div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-inter font-semibold text-gray-900 mb-4">
                About
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                <p>
                  Paquin Law provides strategic legal counsel for modern businesses. We guide founders, owners, and leadership teams through each stage of growth, helping them navigate the legal and business decisions that shape the company.
                </p>
                <p>
                  The firm also maintains a dedicated niche representing homeowners in solar contract and financing disputes. We evaluate financing structure, contract terms, and performance issues to pursue practical resolutions for our clients.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-inter font-semibold text-gray-900 mb-4">
                How We Work
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We start with a clear understanding of your goals. We communicate directly, write with precision, and stay focused on the outcome. The goal is simple: move the matter forward with clarity and control.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;