"use client";

import { motion } from "framer-motion";
import { Calendar, Compass, FileText, LifeBuoy } from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We start with a short conversation to understand your goals and schedule a consultation.",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Strategy and Scope",
    description: "We define scope, deliverables, and timeline with a clear proposal.",
    icon: Compass,
  },
  {
    id: 3,
    title: "Drafting and Execution",
    description: "We prepare and refine your agreements, keeping you informed throughout.",
    icon: FileText,
  },
  {
    id: 4,
    title: "Ongoing Support",
    description: "We stay available for continued guidance as your business grows.",
    icon: LifeBuoy,
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="py-20 md:py-32 pb-32 md:pb-40 bg-white"
      aria-label="Our Process"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Original Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Heading */}
          <div className="transition-all duration-700">
            <h2 className="text-5xl md:text-6xl font-inter font-bold text-gray-900 mb-4">
              Our Process.
            </h2>
            <div className="w-32 h-1 bg-primary"></div>
          </div>

          {/* Right Column - Content */}
          <div className="transition-all duration-700 delay-200">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Here's how we work together to achieve your legal and business goals, from initial consultation to ongoing partnership.
            </p>
          </div>
        </div>

        {/* Vertical Steps - Centered */}
        <div className="max-w-3xl mx-auto mt-24">
          <div className="space-y-20">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.15,
                  }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-xl"
                  >
                    <Icon className="h-10 w-10" />
                  </motion.div>

                  {/* Content */}
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-4xl font-inter font-semibold text-gray-900 mb-6">
                      {step.title}
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;