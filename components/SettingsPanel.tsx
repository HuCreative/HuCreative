import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Zap, ZapOff, Moon, Sun } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Basic implementation using localStorage
  const [reduceMotion, setReduceMotion] = useState(() => localStorage.getItem('reduceMotion') === 'true');

  const toggleMotion = () => {
    const newVal = !reduceMotion;
    setReduceMotion(newVal);
    localStorage.setItem('reduceMotion', String(newVal));
    if (newVal) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    window.location.reload(); 
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-muted hover:text-electric transition-colors p-2"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[90]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-80 bg-charcoal border-l border-white/10 shadow-2xl z-[100] p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-display font-bold text-xl text-main">Display Settings</h2>
                <button onClick={() => setIsOpen(false)} className="text-muted hover:text-main">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Motion Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {reduceMotion ? <ZapOff size={20} className="text-muted" /> : <Zap size={20} className="text-electric" />}
                    <div>
                      <h3 className="font-bold text-main">Animations</h3>
                      <p className="text-xs text-muted">Enable/Disable effects</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMotion}
                    className={`w-12 h-6 rounded-full relative transition-colors ${!reduceMotion ? 'bg-electric' : 'bg-gray-500/20'}`}
                  >
                    <motion.div
                      animate={{ x: !reduceMotion ? 26 : 2 }}
                      className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
                    />
                  </button>
                </div>

                <div className="h-px bg-white/5" />

                <div className="text-xs text-muted leading-relaxed">
                  <p>Disabling animations will turn off the particle cursor, morphing backgrounds, and heavy transitions for better performance or accessibility.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;