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
      className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden"
    >
      {/* White space at top */}
      <div className="absolute inset-0 top-0 h-32 md:h-40 bg-white z-10" />
      
      {/* Background Image - starts below white space */}
      <div 
        className="absolute inset-0 top-32 md:top-40 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/michael-benz--IZ2sgQKIhM-unsplash.jpg')",
        }}
      />
      
      {/* Gradient fade from white to transparent */}
      <div className="absolute inset-0 top-32 md:top-40 h-24 md:h-32 bg-gradient-to-b from-white via-white/50 to-transparent z-5" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-inter font-bold text-gray-900 mb-4">
              Contact Us.
            </h2>
            <div className="w-32 h-1 bg-primary mb-8"></div>
            
            {/* Contact Information */}
            <div className="mb-8">
              <div className="flex flex-col gap-6 text-gray-900">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href="tel:+12102811866"
                    className="hover:text-primary transition-colors"
                  >
                    210-281-1866
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Texas-based, serving clients worldwide</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl md:text-3xl font-inter font-bold text-gray-900 mb-4">
                Let's Talk.
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Share a brief description of your business or solar-related issue and how to reach you. We'll review your message and follow up to discuss whether Paquin Law is a good fit and what next steps might look like.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                Contacting Paquin Law does not create an attorney–client relationship. Please do not include confidential details until we've confirmed representation.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="bg-white rounded-none p-8 md:p-12 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`bg-white border-gray-300 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary h-12 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-white border-gray-300 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary h-12 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`bg-white border-gray-300 text-gray-900 placeholder-gray-400 resize-none transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    placeholder="Tell us about your legal needs..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

