"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="w-full mt-[76px]">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:h-[91.5vh] min-h-[600px] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/60 before:z-10"
          style={{
            backgroundImage: `url('/two-eagles.png')`,
          }}
        >
          {/* Changed bg-black/50 to bg-gradient-to-b for a more sophisticated overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-20">
            <div className="container mx-auto h-full">
              <div className="flex h-full items-center">
                <motion.div
                  className="w-full text-center text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h1 className="text-2xl md:text-5xl font-bold mb-4">
                    Empowering <span className="text-emerald-500">Conservation</span> through
                    <br />
                    Collaboration <span className="text-emerald-500">and</span> Technology.
                  </h1>
                  <p className="text-xl mb-4 text-gray-300">
                    In preserving the wild, we preserve ourselves.
                    <br />
                    Join us in shaping a sustainable future for all species.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};