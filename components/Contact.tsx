"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create mailto link
      const subject = encodeURIComponent("Consultation Request from " + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:contact@paquinlaw.com?subject=${subject}&body=${body}`;
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/street.jpg')",
        }}
      />
      
      {/* Gradient overlay for seamless transition to footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="text-5xl md:text-6xl font-inter font-bold text-white mb-4">
                  Contact Us.
                </h2>
                <div className="w-32 h-1 bg-white"></div>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
            {/* Contact Information */}
            <div className="mb-12">
              <div className="flex flex-col gap-6 text-white/80">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-white/60" />
                  <a
                    href="tel:+12102811866"
                    className="hover:text-white transition-colors"
                  >
                    210-281-1866
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-white/60" />
                  <span>Texas-based, serving clients worldwide</span>
                </div>
              </div>
            </div>

                {/* Large Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-xl"
                >
                  <h3 className="text-3xl md:text-4xl font-inter font-bold text-white mb-4">
                    Let's Talk.
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Share a brief description of your business or solar-related issue and how to reach you. We'll review your message and follow up to discuss whether Paquin Law is a good fit and what next steps might look like.
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                    Contacting Paquin Law does not create an attorney–client relationship. Please do not include confidential details until we've confirmed representation.
                  </p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-3"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`backdrop-blur-sm bg-white/10 border-white/30 text-white placeholder-white/60 transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:border-white/50 h-12 ${
                        errors.name ? "border-red-400" : ""
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-300">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-3"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`backdrop-blur-sm bg-white/10 border-white/30 text-white placeholder-white/60 transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:border-white/50 h-12 ${
                        errors.email ? "border-red-400" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-300">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-3"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`backdrop-blur-sm bg-white/10 border-white/30 text-white placeholder-white/60 resize-none transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:border-white/50 ${
                      errors.message ? "border-red-400" : ""
                    }`}
                    placeholder="Tell us about your legal needs..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm h-12 text-lg font-medium"
                >
                  Send Message
                </Button>
              </form>
                </motion.div>
              </motion.div>
            </div>
      </div>
    </section>
  );
};

export default Contact;

