import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '',
  type = 'button'
}) => {
  const baseClasses = "font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 inline-flex items-center justify-center gap-2";
  
  const variants = {
    // Primary: Blue bg, White text. Hover: Main text (Dark in Light mode), Charcoal bg (White in Light mode).
    // Note: To get high contrast hover in both modes, we use hover:bg-main hover:text-charcoal
    primary: "bg-electric text-white hover:bg-main hover:text-charcoal border border-electric hover:border-main",
    
    // Outline: Transparent bg, Main text (Dark in Light mode). Hover: Blue bg, White text.
    outline: "bg-transparent text-main border border-neutralGray hover:border-electric hover:bg-electric hover:text-white",
    
    ghost: "bg-transparent text-muted hover:text-main"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: href.startsWith('mailto') ? undefined : "_blank" } : { onClick, type };

  return (
    // @ts-ignore
    <Component
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;