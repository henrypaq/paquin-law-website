"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Lightbulb, PenLine, HeartHandshake } from "lucide-react";

const processSteps = [
  {
    number: 1,
    title: "Schedule Consultation",
    description:
      "Book a free initial consultation to discuss your legal needs and determine how we can best serve your business objectives.",
    icon: MessageSquare,
  },
  {
    number: 2,
    title: "Engagement & Planning",
    description:
      "We'll formalize our working relationship with a clear engagement letter and develop a strategic plan tailored to your specific situation.",
    icon: Lightbulb,
  },
  {
    number: 3,
    title: "Legal Work & Execution",
    description:
      "Our team handles all necessary legal work, from document drafting to negotiations, keeping you informed throughout the process.",
    icon: PenLine,
  },
  {
    number: 4,
    title: "Ongoing Partnership",
    description:
      "We maintain an ongoing relationship, providing continued legal support as your business grows and evolves.",
    icon: HeartHandshake,
  },
];

const Process = () => {
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
      id="process"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left Column - Heading */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-inter font-bold text-gray-900 mb-4">
              Our Process.
            </h2>
            <div className="w-32 h-1 bg-primary"></div>
          </div>

          {/* Right Column - Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Here's how we work together to achieve your legal and business goals, from initial consultation to ongoing partnership.
            </p>
          </div>
        </div>

        {/* Process Steps - Circular Icons */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`relative transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${(index + 2) * 150}ms` : "0ms",
                  }}
                >
                  {/* Circular Icon */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-inter font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

