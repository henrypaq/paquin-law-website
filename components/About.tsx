"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const aboutItems = [
  {
    title: "Top Tier Experience",
    description: "Our team brings decades of combined experience in corporate law, technology transactions, and business formation, ensuring you receive expert guidance at every step."
  },
  {
    title: "Business Focus",
    description: "We understand the unique challenges facing modern businesses and provide practical, business-oriented legal solutions that support your growth and success."
  },
  {
    title: "Bench Strength",
    description: "With deep expertise across multiple practice areas, we can handle complex matters that require specialized knowledge and comprehensive legal support."
  },
  {
    title: "Client-Centered Solutions",
    description: "Every legal strategy is tailored to your specific needs, goals, and circumstances, ensuring solutions that work for your business."
  },
  {
    title: "Flexible and Cost-Efficient",
    description: "We offer flexible engagement models and transparent pricing to provide high-quality legal services that fit your budget and business model."
  }
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
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

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
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
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Paquin Law is a corporate and technology law firm with offices in New Orleans, providing expert legal advice on complex legal matters at various levels for startups, corporations, and technology companies nationwide.
            </p>
          </motion.div>
        </div>

        {/* Expandable Items */}
        <div className="space-y-0">
          {aboutItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full flex items-center justify-between text-left hover:bg-primary transition-colors duration-200 p-6 group"
                >
                  <span className="text-xl font-inter font-medium text-gray-900 group-hover:text-white transition-colors duration-200">
                    {item.title}
                  </span>
                  <div className="text-primary group-hover:text-white transition-colors duration-200">
                    {expandedItems.includes(index) ? (
                      <Minus className="h-6 w-6" />
                    ) : (
                      <Plus className="h-6 w-6" />
                    )}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-6 bg-white">
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;