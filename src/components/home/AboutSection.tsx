"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Binoculars } from "lucide-react";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-light" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12">
          <h2 className="text-center text-gray-600 text-sm font-light tracking-[0.2em] uppercase mb-3">
            About Us
          </h2>
          <h1 className="text-center font-serif text-[#8B9B3E] text-5xl font-medium tracking-wide mb-0 text-shadow">
            Wildlife Conservation Hub
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="h-full bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <Target
                  className="w-8 h-8 text-primary"
                  strokeWidth={1.5}
                />
                <h3 className="mb-0 text-2xl font-semibold">Our Mission</h3>
              </div>
              <blockquote className="text-lg mb-0 font-light italic leading-relaxed">
                "enhance education, promote collaboration, and drive
                wildlife preservation initiatives among conservationists,
                researchers, and the public"
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="h-full bg-secondary text-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-r-4 border-white">
              <div className="flex items-center gap-3 mb-4">
                <Binoculars className="w-8 h-8" strokeWidth={1.5} />
                <h3 className="mb-0 text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-lg mb-0 font-light leading-relaxed">
                Empowering minds to understand and protect wildlife. Through
                education, research, and community engagement, we strive to
                create a world where humans and wildlife thrive together in
                sustainable harmony.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
