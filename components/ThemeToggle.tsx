import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  // Logic inverted: isDark is true if 'dark' class exists
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync with initial state
    const html = document.documentElement;
    const hasDarkClass = html.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-neutralGray border border-main/10 text-main hover:bg-main/10 transition-colors relative overflow-hidden"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{ scale: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} className="text-electric" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ scale: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} className="text-orange-500" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;