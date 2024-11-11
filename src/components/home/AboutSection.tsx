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
    <div className="container-fluid bg-light py-5" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4 text-muted font-light tracking-wider">
            ABOUT US
          </h2>
          <h1
            className="text-center mb-5 font-serif"
            style={{
              color: "#8B9B3E",
              fontSize: "2.75rem",
              letterSpacing: "0.05em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Wildlife Conservation Hub
          </h1>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              <motion.div
                className="col-md-6"
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white h-100 p-5 shadow-sm rounded-lg hover-lift transition-all duration-300 hover:shadow-lg border-l-4 border-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <Target
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.5}
                    />
                    <h3 className="mb-0 text-2xl font-semibold">Our Mission</h3>
                  </div>
                  <blockquote className="text-lg mb-0 font-light italic leading-relaxed">
                  &quot;enhance education, promote collaboration, and drive
                    wildlife preservation initiatives among conservationists,
                    researchers, and the public&quot;
                  </blockquote>
                </div>
              </motion.div>

              <motion.div
                className="col-md-6"
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-secondary text-white h-100 p-5 rounded-lg shadow-sm hover-lift transition-all duration-300 hover:shadow-lg border-r-4 border-white">
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
        </div>
      </div>
    </div>
  );
};
