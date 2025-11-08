import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const particlesCount = 70;

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  // Increment progress randomly for natural feel
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 2 + 1);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Particle generator
  const particles = Array.from({ length: particlesCount }).map((_, i) => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = 8 + Math.random() * 5;
    const delay = Math.random() * 3;

    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          top: `${startY}%`,
          left: `${startX}%`,
          width: `${size}px`,
          height: `${size}px`,
          background:
            "radial-gradient(circle, rgba(255,255,150,1) 0%, rgba(255,140,0,0.7) 60%, rgba(255,69,0,0.2) 100%)",
          filter: "blur(1.5px)",
        }}
        animate={{
          y: ["0%", "-150%"],
          x: [0, Math.random() * 40 - 20, 0],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "easeOut",
          delay: delay,
        }}
      />
    );
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          {/* Spark Particles */}
          {particles}

          {/* Central Glow */}
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-yellow-400/40 via-orange-500/30 to-red-600/10 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Logo Animation */}
          <motion.div
            className="text-white text-4xl md:text-5xl font-extrabold mb-6 flex flex-col items-center drop-shadow-xl"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
              AM Enterprises
            </div>
            <div className="text-sm md:text-base mt-1 text-white/80">
              360° Digital Marketing Agency
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 md:w-80 h-4 bg-white/20 rounded-full overflow-hidden mt-6 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>

          {/* Percentage Counter */}
          <motion.span
            className="mt-3 text-white font-semibold text-lg md:text-xl drop-shadow-md"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            {progress}%
          </motion.span>

          {/* Footer Message */}
          <motion.div
            className="mt-6 text-white/60 text-sm md:text-base font-medium"
            animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Preparing your digital experience...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
