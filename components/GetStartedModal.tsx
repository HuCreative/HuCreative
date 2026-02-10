import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Send, User, Smartphone, Mail, FileText } from 'lucide-react';
import { PricingPlan } from '../types';
import { useData } from '../context/DataContext';

interface GetStartedModalProps {
  plan: PricingPlan;
  onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ plan, onClose }) => {
  const { addOrder, addMessage } = useData();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    requirements: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!formData.mobile.trim() || !phoneRegex.test(formData.mobile.trim())) newErrors.mobile = true;
    if (!formData.requirements.trim()) newErrors.requirements = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Format message for Admin Panel
    const timestamp = new Date().toLocaleString();
    const formattedMessage = `
-----------------------------------------------------
Client Name:      ${formData.name}
Mobile Number:    ${formData.mobile}
Email Address:    ${formData.email}
Requirements:     ${formData.requirements}
Selected Plan:    ${plan.name} (${plan.price})
Submitted On:     ${timestamp}
-----------------------------------------------------
    `.trim();

    // 1. Add Message for Admin Panel
    addMessage({
      name: formData.name,
      email: formData.email,
      message: formattedMessage
    });

    // 2. Add Order for Revenue Tracking
    const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, '')) || 0;
    addOrder({
      clientName: formData.name,
      serviceType: plan.name,
      status: 'Pending',
      amount: numericPrice,
      notes: `Mobile: ${formData.mobile}`
    });

    setIsLoading(false);
    setIsSuccess(true);

    // Auto-close after 4 seconds as requested
    setTimeout(() => {
      onClose();
    }, 4000);
  };

  const inputClasses = (hasError: boolean) => `
    w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none text-gray-900 transition-all duration-200
    ${hasError 
      ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
      : 'border-gray-200 focus:border-electric focus:ring-4 focus:ring-electric/10 hover:border-gray-300'}
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop with soft fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card with requested animation: Upward Slide + Scale Up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full h-full md:h-auto md:max-w-md bg-white md:rounded-2xl shadow-2xl overflow-hidden text-charcoal flex flex-col"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex justify-between items-start">
          <div>
             <span className="text-xs font-bold text-electric uppercase tracking-wider mb-1 block">
               Start Your Project
             </span>
             <h2 className="font-display font-bold text-2xl text-gray-900">
              {plan.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4 mt-2"
              >
                <p className="text-gray-500 text-sm mb-4">
                  Fill in your details to proceed.
                </p>

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => {
                      setFormData({...formData, name: e.target.value});
                      if(errors.name) setErrors({...errors, name: false});
                    }}
                    className={inputClasses(!!errors.name)}
                  />
                </div>

                {/* Mobile */}
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={e => {
                      setFormData({...formData, mobile: e.target.value});
                      if(errors.mobile) setErrors({...errors, mobile: false});
                    }}
                    className={inputClasses(!!errors.mobile)}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => {
                      setFormData({...formData, email: e.target.value});
                      if(errors.email) setErrors({...errors, email: false});
                    }}
                    className={inputClasses(!!errors.email)}
                  />
                </div>

                {/* Requirements */}
                <div className="relative">
                  <FileText className="absolute left-3 top-4 text-gray-400" size={18} />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    value={formData.requirements}
                    onChange={e => {
                      setFormData({...formData, requirements: e.target.value});
                      if(errors.requirements) setErrors({...errors, requirements: false});
                    }}
                    className={`${inputClasses(!!errors.requirements)} pl-10 resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-electric hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Submit Request <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center h-full min-h-[300px]"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-sm">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-4">
                  Details Submitted Successfully
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Your details have been submitted successfully. If the freelancer is available to take on this project, they will contact you through your email or mobile number.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStartedModal;