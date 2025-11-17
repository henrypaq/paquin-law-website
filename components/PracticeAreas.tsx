"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const practiceAreas = [
  {
    title: "Business Advisory & Corporate Governance",
    description:
      "Paquin Law advises founders, owners, and leadership teams on entity structure, governance, and operational business decisions, with practical guidance that's grounded in how companies actually operate.",
    backgroundImage: "/muhammad-faiz-zulkeflee-alw-CwGFmwQ-unsplash.jpg",
  },
  {
    title: "Commercial Contracts & Strategic Transactions",
    description:
      "Paquin Law prepares, reviews, and negotiates the agreements that shape your business—customer and vendor contracts, employment agreements, and corporate formation and restructuring documents.",
    backgroundImage: "/kaffie-co-5KZt_ZnNTcI-unsplash.jpg",
  },
  {
    title: "Technology, SaaS & Licensing",
    description:
      "Paquin Law advises companies on technology and SaaS contracts, software and IP licensing, and other technology-driven contracts.",
    backgroundImage: "/arif-riyanto-vJP-wZ6hGBg-unsplash.jpg",
  },
  {
    title: "Solar Contract & Financing Disputes",
    description:
      "Paquin Law represents homeowners in disputes involving solar installation contracts, system performance, and financing arrangements. We untangle complex contracts and loan structures to pursue practical resolutions with installers, lenders, and servicers.",
    backgroundImage: "/benjamin-jopen-2SfssudtyIA-unsplash.jpg",
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
      className="relative h-[500px] w-full cursor-pointer"
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
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="text-white/90 text-lg font-inter font-semibold">
                {area.title}
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="relative w-full h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-inter font-semibold text-gray-900 mb-4">
                {area.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {area.description}
              </p>
            </div>
            <div className="text-left">
              <button 
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-300"
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
              Paquin Law partners with business leadership teams to navigate corporate, commercial, and technology matters, with a dedicated niche in complex solar and energy disputes.
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