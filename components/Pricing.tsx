import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_PLANS } from '../constants';
import { PricingPlan } from '../types';
import { Check, Clock, RefreshCw, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import GetStartedModal from './GetStartedModal';

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handlePlanSelect = (plan: PricingPlan) => {
    // 4. Optional: Tracking & Analytics
    console.log('Plan Selected:', {
      planName: plan.name,
      price: plan.price,
      timestamp: new Date().toISOString(),
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    });

    // Open Modal
    setSelectedPlan(plan);
  };

  return (
    <>
      <section className="py-24 px-6 bg-charcoal relative overflow-hidden" id="pricing">
          <div className="max-w-7xl mx-auto relative z-10">
              {/* Header */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
              >
                  <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-main">Pricing Plans</h2>
                  <p className="text-muted font-mono">Transparent pricing tailored for your growth.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRICING_PLANS.map((plan, index) => (
                      <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`relative p-8 rounded-2xl border flex flex-col ${
                            index === 1 
                              ? 'border-electric bg-neutralGray/40 shadow-2xl shadow-electric/10' 
                              : 'border-main/10 bg-neutralGray/20'
                          }`}
                      >
                           {index === 1 && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
                                  Most Popular
                              </div>
                          )}
                          <div className="mb-6">
                              <h3 className={`font-display font-bold text-2xl mb-2 ${index === 2 ? 'text-mint' : 'text-main'}`}>{plan.name}</h3>
                              <p className="text-muted text-sm h-12 leading-relaxed">{plan.tagline}</p>
                          </div>
                          <div className="mb-8 p-4 bg-charcoal/50 rounded-xl border border-main/5">
                              <div className="text-4xl font-bold text-main mb-2">{plan.price}</div>
                              <div className="flex flex-col gap-2 text-xs font-mono text-muted uppercase tracking-wider">
                                  <span className="flex items-center gap-2"><Clock size={14} className="text-electric" /> {plan.delivery} Delivery</span>
                                  <span className="flex items-center gap-2"><RefreshCw size={14} className="text-electric" /> {plan.revisions}</span>
                              </div>
                          </div>
                          
                          <ul className="space-y-4 mb-8 flex-grow">
                              {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                      <div className="mt-0.5 min-w-[16px]">
                                          <Check className={index === 1 ? "text-electric" : "text-gray-500"} size={16} />
                                      </div>
                                      <span className="leading-tight">{feature}</span>
                                  </li>
                              ))}
                          </ul>

                          <div className="mt-auto">
                              <div className="mb-6 p-4 bg-main/5 rounded-lg text-xs text-muted border border-main/5">
                                  <span className={`font-bold block mb-1 uppercase tracking-widest ${index === 1 ? 'text-electric' : 'text-gray-500'}`}>Best For</span>
                                  {plan.bestFor}
                              </div>
                              <Button 
                                  onClick={() => handlePlanSelect(plan)}
                                  variant={index === 1 ? 'primary' : 'outline'}
                                  className={`w-full group ${
                                    index === 1 
                                      ? 'hover:shadow-[0_0_30px_-5px_rgba(79,139,255,0.6)]' 
                                      : 'hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)]'
                                  }`}
                              >
                                  Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </Button>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Modal Integration */}
      <AnimatePresence>
        {selectedPlan && (
          <GetStartedModal 
            plan={selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Pricing;