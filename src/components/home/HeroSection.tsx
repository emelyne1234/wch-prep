"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="container-fluid p-0" style={{ marginTop: "76px" }}>
      <div className="position-relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            height: "100vh",
            minHeight: "600px",
            backgroundImage: "url(/two-eagles 1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <motion.div
                  className="col-12 text-center text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}>
                  <h1 className="display-4 fw-bold mb-4">
                    Empowering Conservation through
                    <br />
                    Collaboration and Technology.
                  </h1>
                  <p className="lead mb-4">
                    In preserving the wild, we preserve ourselves.
                    <br />
                    Join us in shaping a sustainable future for all species.
                  </p>
                  <motion.button
                    className="btn btn-success btn-lg px-5 py-3 rounded-pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Get involved
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
