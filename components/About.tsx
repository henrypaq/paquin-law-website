"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* Left — title + copy (natural height, no scroll) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:gap-7"
          >
            <header className="shrink-0">
              <h2 className="text-4xl sm:text-5xl md:text-5xl font-inter font-bold text-gray-900 mb-3">
                About.
              </h2>
              <div className="w-24 h-1 bg-primary" />
            </header>

            <div className="flex flex-col gap-5 lg:gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-inter font-semibold text-gray-900 mb-2">
                  About Christen Paquin
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Christen founded Paquin Law to serve as the trusted legal
                  counsel businesses need in their corner. She works closely
                  with founders and leadership teams to offer clear, practical
                  advice attuned to the demands of building and running a
                  company. Clients work with Christen when they need careful
                  judgment and a steady legal voice to help navigate important
                  decisions with confidence.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3">
                  Christen also represents homeowners in disputes involving
                  residential solar systems, financing agreements, and related
                  business practices. Across her practice, clients work with
                  Christen when they need grounded judgment and practical
                  direction.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-inter font-semibold text-gray-900 mb-2">
                  Credentials
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Christen is licensed by the State Bar of Texas and admitted to
                  practice before the United States Supreme Court, the United
                  States Court of Appeals for the Fifth Circuit, and all federal
                  district and bankruptcy courts in Texas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — headshot (aspect box, no fixed row height) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md lg:mx-0 lg:justify-self-end aspect-[4/5] overflow-hidden rounded-sm shadow-lg ring-1 ring-black/5"
          >
            <Image
              src="/christen-paquin-headshot.png"
              alt="Professional headshot of Christen Paquin, founder of Paquin Law, wearing a navy blazer and smiling."
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 320px, 448px"
              className="object-cover object-[center_14%] contrast-[1.03] saturate-[1.03]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
