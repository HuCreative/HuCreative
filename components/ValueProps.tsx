import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, User, Sparkles } from 'lucide-react';

const props = [
  { 
    icon: User, 
    title: "No Middlemen", 
    desc: "Tired of account managers? Deal directly with the creator (Me). Nothing gets lost in translation." 
  },
  { 
    icon: Zap, 
    title: "Insane Speed", 
    desc: "Agencies take months. I ship high-quality websites in 7-10 days. Speed is money." 
  },
  { 
    icon: ShieldCheck, 
    title: "Risk-Free Guarantee", 
    desc: "I don't hold your website hostage. You own 100% of the code and assets upon delivery." 
  },
  { 
    icon: Sparkles, 
    title: "Student Prices", 
    desc: "Premium quality without the 'Agency Tax'. Save up to 60% compared to local firms." 
  }
];

const ValueProps: React.FC = () => {
  return (
    <section className="py-20 bg-neutralGray/10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-main">Why Choose a Student?</h2>
            <p className="text-muted">Because you want hunger, talent, and transparency.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-charcoal/50 rounded-2xl border border-white/5 hover:border-electric/30 transition-colors duration-300"
              >
                <div className="mb-4 p-4 bg-charcoal rounded-full border border-white/10 text-electric">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{prop.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-mono">{prop.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;