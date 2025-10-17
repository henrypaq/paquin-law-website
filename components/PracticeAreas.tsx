"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, FileText, Laptop, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const practiceAreas = [
  {
    title: "Corporate Formation",
    description:
      "Strategic guidance for entity selection, incorporation, and organizational structuring to support your business goals.",
    icon: Building2,
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    title: "Contracts",
    description:
      "Drafting, reviewing, and negotiating commercial agreements to protect your interests and minimize risk.",
    icon: FileText,
    backgroundImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
  },
  {
    title: "Technology Transactions",
    description:
      "Specialized counsel for software licensing, SaaS agreements, and technology-driven business arrangements.",
    icon: Laptop,
    backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
  },
  {
    title: "Compliance and Risk",
    description:
      "Proactive compliance strategies and risk management frameworks tailored to your industry and operations.",
    icon: Shield,
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
];

const FlipCard = ({ area, index, isVisible }: { area: typeof practiceAreas[0], index: number, isVisible: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="relative h-96 w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div
            className="relative w-full h-full bg-cover bg-center bg-no-repeat overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            style={{
              backgroundImage: `url(${area.backgroundImage})`,
            }}
          >
            {/* Dark overlay that lightens on hover */}
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/30 transition-colors duration-200" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div className="text-white/90 text-lg font-inter font-semibold">
                {area.title}
              </div>
              
              <div className="flex items-center text-white text-sm font-medium">
                LEARN MORE <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="relative w-full h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <area.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-inter font-semibold text-gray-900">
                {area.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {area.description}
            </p>
            <div className="mt-6 text-center">
              <button 
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PracticeAreas = () => {
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
      id="practice-areas"
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
              What We Do Best.
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
              Paquin Law lawyers are focused on what they do best: providing prompt expert legal advice and representation on a very wide variety of complex commercial matters for startups, corporations, and technology companies.
            </p>
          </motion.div>
        </div>

        {/* Practice Areas Cards - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {practiceAreas.map((area, index) => (
            <FlipCard
              key={area.title}
              area={area}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;