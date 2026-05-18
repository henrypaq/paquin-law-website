"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Desktop: both columns share one height so the headshot matches the text block. */
const ABOUT_ROW_HEIGHT =
  "min-h-0 lg:h-[min(calc(100vh-7rem),clamp(27rem,40vw,36rem))]";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-stretch">
          {/* Left — title + copy (same visual height as image column on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col justify-between gap-6 lg:gap-8 ${ABOUT_ROW_HEIGHT} min-h-0`}
          >
            <header className="shrink-0">
              <h2 className="text-5xl md:text-6xl font-inter font-bold text-gray-900 mb-4">
                About.
              </h2>
              <div className="w-32 h-1 bg-primary" />
            </header>

            <div className="min-h-0 flex flex-col justify-center gap-6 lg:gap-8 lg:flex-1 lg:overflow-y-auto lg:pr-1">
              <div>
                <h3 className="text-2xl md:text-3xl font-inter font-semibold text-gray-900 mb-4">
                  About Christen Paquin
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Christen founded Paquin Law to serve as the trusted legal
                  counsel that businesses need in their corner. She works closely
                  with founders and leadership teams to offer clear, practical
                  advice attuned to the demands of building and running a
                  company. Clients work with Christen when they need careful
                  drafting and a steady legal voice to help navigate important
                  decisions with confidence.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                  Christen also represents homeowners in disputes involving
                  residential solar systems, financing agreements, and related
                  business practices. Across her practice, clients work with
                  Christen when they need a steady legal voice to help navigate
                  important decisions with confidence.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-inter font-semibold text-gray-900 mb-4">
                  Credentials
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Christen is licensed by the State Bar of Texas and admitted to
                  practice before the United States Supreme Court, the United
                  States Court of Appeals for the Fifth Circuit, and all federal
                  district and bankruptcy courts in Texas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — headshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className={`relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 lg:justify-self-end overflow-hidden rounded-sm shadow-lg ring-1 ring-black/5 ${ABOUT_ROW_HEIGHT}`}
          >
            <Image
              src="/christen-paquin-headshot.png"
              alt="Professional headshot of Christen Paquin, founder of Paquin Law, wearing a navy blazer and smiling."
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) min(100vw, 28rem) min(44vw, 36rem)"
              className="object-cover object-[center_14%] contrast-[1.03] saturate-[1.03]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
