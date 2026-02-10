import React from 'react';
import { motion } from 'framer-motion';

// Animation #5: Fullscreen spinner/logo morph to site
const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -m-8 border-t-2 border-r-2 border-electric/30 rounded-full w-40 h-40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -m-4 border-b-2 border-l-2 border-mint/30 rounded-full w-32 h-32"
        />

        {/* Center Logo/Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="font-display font-bold text-3xl text-white tracking-tighter"
        >
          Hu<span className="text-electric">.</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;