import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { EMAIL, INSTAGRAM } from '../constants';
import { Send, Instagram, Mail, CheckCircle, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PricingPlan } from '../types';

const Contact: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addMessage, addOrder } = useData();
  
  // Check if user navigated here with a selected plan
  const selectedPlan = location.state?.selectedPlan as PricingPlan | undefined;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Pre-fill form if plan is selected
  useEffect(() => {
    if (selectedPlan) {
      setFormState(prev => ({
        ...prev,
        message: `I'm interested in the ${selectedPlan.name} (${selectedPlan.price}). I'd like to get started with the following project details...`
      }));
    }
  }, [selectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Save Message to context
    addMessage(formState);

    // 2. If a plan was selected, also create a Pending Order
    if (selectedPlan) {
      addOrder({
        clientName: formState.name,
        serviceType: selectedPlan.name, // e.g. "Pro Plan"
        status: 'Pending',
        amount: parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) || 0,
        notes: `Initial Inquiry via website. Message: ${formState.message}`
      });
    }
    
    // 3. Trigger mailto for direct contact (Alternative Flow)
    const subject = selectedPlan 
      ? `New Order Request: ${selectedPlan.name} from ${formState.name}`
      : `New Inquiry from ${formState.name}`;
      
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.email)}`;
    
    // 4. Success Flow
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    
    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const clearSelectedPlan = () => {
    // Clear the state without reloading the page
    navigate(location.pathname, { replace: true, state: {} });
    setFormState(prev => ({ ...prev, message: '' }));
  };

  const inputBorderVariants = {
    idle: { borderColor: "rgba(255, 255, 255, 0.1)" },
    focused: { borderColor: "#4F8BFF" }
  };

  const labelVariants = {
    idle: { scale: 1, color: "#9ca3af" }, // text-gray-400
    focused: { scale: 1.05, color: "#4F8BFF", originX: 0 } // slightly scale up
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Text / Info */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-8"
        >
          <div>
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6">Let's Work Together</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you need a logo, a website, or a stunning ad creative, I’m ready to help. 
              Let's create something meaningful.
            </p>
          </div>

          <div className="pt-8 space-y-6">
             <div className="flex items-center gap-4 text-gray-300">
               <div className="w-12 h-12 bg-neutralGray flex items-center justify-center border border-white/5">
                 <Mail className="text-electric" />
               </div>
               <div>
                 <p className="text-sm font-mono text-gray-500 uppercase">Email Me</p>
                 <a href={`mailto:${EMAIL}`} className="text-lg hover:text-electric transition-colors">{EMAIL}</a>
               </div>
             </div>
             
             <div className="flex items-center gap-4 text-gray-300">
               <div className="w-12 h-12 bg-neutralGray flex items-center justify-center border border-white/5">
                 <Instagram className="text-electric" />
               </div>
               <div>
                 <p className="text-sm font-mono text-gray-500 uppercase">Follow Me</p>
                 <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-lg hover:text-electric transition-colors">@veltone.store</a>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-neutralGray p-8 md:p-12 border border-white/5 relative overflow-hidden flex flex-col"
        >
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 w-full bg-green-900/90 text-white p-4 text-center flex items-center justify-center gap-2 z-20"
            >
              <CheckCircle size={18} /> Message sent successfully! I'll get back to you shortly.
            </motion.div>
          )}

          {/* Selected Plan Summary Card */}
          <AnimatePresence>
            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-charcoal border border-electric/30 p-4 rounded-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2">
                   <button onClick={clearSelectedPlan} className="text-gray-500 hover:text-white transition-colors">
                     <X size={16} />
                   </button>
                </div>
                <p className="text-xs font-mono text-electric uppercase tracking-wider mb-1">Selected Plan</p>
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold text-white">{selectedPlan.name}</h3>
                   <span className="text-lg font-bold text-gray-300">{selectedPlan.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{selectedPlan.tagline}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <motion.label 
                htmlFor="name" 
                className="block text-sm font-mono uppercase mb-2 origin-left"
                variants={labelVariants}
                initial="idle"
                animate={focusedField === 'name' ? 'focused' : 'idle'}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Name
              </motion.label>
              <motion.input 
                type="text" 
                id="name"
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-charcoal border border-white/10 p-4 text-white focus:outline-none transition-colors duration-200"
                variants={inputBorderVariants}
                initial="idle"
                animate={focusedField === 'name' ? 'focused' : 'idle'}
                transition={{ duration: 0.2 }}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <motion.label 
                htmlFor="email" 
                className="block text-sm font-mono uppercase mb-2 origin-left"
                variants={labelVariants}
                initial="idle"
                animate={focusedField === 'email' ? 'focused' : 'idle'}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Email
              </motion.label>
              <motion.input 
                type="email" 
                id="email"
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-charcoal border border-white/10 p-4 text-white focus:outline-none transition-colors duration-200"
                variants={inputBorderVariants}
                initial="idle"
                animate={focusedField === 'email' ? 'focused' : 'idle'}
                transition={{ duration: 0.2 }}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <motion.label 
                htmlFor="message" 
                className="block text-sm font-mono uppercase mb-2 origin-left"
                variants={labelVariants}
                initial="idle"
                animate={focusedField === 'message' ? 'focused' : 'idle'}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Message
              </motion.label>
              <motion.textarea 
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-charcoal border border-white/10 p-4 text-white focus:outline-none transition-colors duration-200"
                variants={inputBorderVariants}
                initial="idle"
                animate={focusedField === 'message' ? 'focused' : 'idle'}
                transition={{ duration: 0.2 }}
                placeholder="Tell me about your project..."
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {selectedPlan ? `Complete Order for ${selectedPlan.name}` : "Write Me Directly"} <Send size={16} />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;