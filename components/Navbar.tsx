import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import ThemeToggle from './ThemeToggle';
import SettingsPanel from './SettingsPanel';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-charcoal/80 backdrop-blur-md border-b border-main/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="group z-50">
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-2xl tracking-tighter text-main group-hover:text-electric transition-colors">
              Hu<span className="font-light text-main/70">Creative</span>
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-mono uppercase tracking-widest transition-colors duration-300 relative ${
                    isActive ? 'text-electric' : 'text-muted hover:text-main'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-electric"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pl-4 border-l border-main/10">
            <ThemeToggle />
            <SettingsPanel />
            <Button href="/contact" variant="primary" className="px-5 py-2.5 text-xs">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <ThemeToggle />
          <SettingsPanel />
          <button
            className="text-main p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-0 left-0 w-full bg-charcoal border-b border-main/10 overflow-hidden z-40 pt-24"
          >
            <div className="flex flex-col p-8 gap-6 h-full">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-3xl font-display font-bold ${
                      isActive ? 'text-electric' : 'text-main/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink 
                to="/contact"
                className="text-3xl font-display font-bold text-main/60 flex items-center gap-2 mt-4"
              >
                Contact <ArrowRight size={28} />
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;