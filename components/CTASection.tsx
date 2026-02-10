import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ArrowRight, Check } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-charcoal via-neutralGray/40 to-charcoal">
      <div className="absolute inset-0 bg-electric/5 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-block px-4 py-1 mb-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-widest animate-pulse"
        >
           Warning: Prices Increasing Next Month
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-6xl mb-6 text-main"
        >
          Stop Losing Sales Today.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          My schedule fills up fast. I only take 3 new projects a month to ensure quality. Secure your slot now before I'm booked.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <Button href="/contact" variant="primary" className="text-lg px-12 py-5 shadow-2xl shadow-electric/30">
            Start Your Project Now <ArrowRight size={20} />
          </Button>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-muted font-mono">
            <span className="flex items-center gap-2"><Check size={14} className="text-green-500" /> 100% Satisfaction Guarantee</span>
            <span className="flex items-center gap-2"><Check size={14} className="text-green-500" /> No Hidden Fees</span>
            <span className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Fast Delivery</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;