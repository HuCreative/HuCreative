import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PromoBanner: React.FC = () => {
  const messages = [
    "Only 3 Project Slots Left This Month",
    "Get A Free Website Audit Today",
    "No Agency Fees. Student Prices.",
    "Pay Only If You Are 100% Satisfied",
    "Websites Delivered In 7 Days",
  ];

  // We duplicate the messages to create a seamless loop
  const marqueeContent = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="w-full h-10 bg-electric text-white relative overflow-hidden flex items-center z-40 shadow-lg">
      <div className="w-full flex overflow-hidden">
        {/* Marquee Container */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-8 pr-8 whitespace-nowrap"
        >
          {marqueeContent.map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono uppercase tracking-wider text-xs font-bold cursor-default">
                {text}
              </span>
              <Zap size={10} className="fill-white animate-pulse" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PromoBanner;