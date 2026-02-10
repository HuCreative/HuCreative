import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './ui/Button';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { EMAIL } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation #2: Parallax scrolling
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 200]); 
  const yText = useTransform(scrollY, [0, 500], [0, 50]); 
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden bg-charcoal">
      
      {/* Animation #7: Abstract Hero Illustration (SVG) */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none opacity-40 dark:opacity-30"
      >
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin-slow">
            <path fill="#4F8BFF" d="M47.7,-57.2C59.9,-43.3,66.7,-24.6,65.7,-6.8C64.6,11,55.8,27.9,43.2,40.7C30.6,53.5,14.3,62.2,-3.4,66.3C-21.1,70.3,-40.1,69.7,-54.6,58.3C-69.1,46.9,-79.1,24.7,-78.1,3.2C-77.1,-18.2,-65.1,-38.9,-49.8,-53.1C-34.5,-67.2,-15.9,-74.9,1.5,-76.7C18.9,-78.5,35.5,-71.1,47.7,-57.2Z" transform="translate(100 100)" className="mix-blend-overlay" />
         </svg>
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center"
      >
        
        {/* Scarcity / Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex flex-col md:flex-row items-center gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-main/5 rounded-full border border-main/10 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="text-xs font-mono text-muted uppercase tracking-wide">Trusted by 15+ Dehradun Businesses</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 backdrop-blur-sm">
             <Clock size={12} className="text-red-400" />
             <span className="text-xs font-mono text-red-300 uppercase tracking-wide font-bold">Only 3 slots left for {new Date().toLocaleString('default', { month: 'long' })}</span>
          </div>
        </motion.div>

        {/* Pain -> Promise Headline */}
        <motion.h1 
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Struggling with low sales? <br />
          Get a <span className="text-electric">High-Converting</span> website in 7 days.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-muted text-sm md:text-lg mb-10 max-w-2xl leading-relaxed"
        >
          Stop losing customers to ugly websites. I build digital experiences that turn visitors into paying clients. Fast, affordable, and built by a student who gets it.
        </motion.p>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Button href="/contact" variant="primary" className="group text-base px-8 py-4 shadow-[0_0_30px_-5px_rgba(79,139,255,0.4)]">
            Book Free Strategy Call <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          <Button href={`mailto:${EMAIL}?subject=Free Website Audit Request`} variant="outline" className="text-base px-8 py-4">
            Get Free Website Audit
          </Button>
        </motion.div>

        {/* Risk Reversal */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="mt-6 flex items-center gap-2 text-xs text-muted font-mono"
        >
           <ShieldCheck size={14} className="text-mint" />
           No Contracts. Pay only if satisfied.
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-electric to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;