import React from 'react';
import { Link } from 'react-router-dom';
import { INSTAGRAM } from '../constants';
import { Instagram, Dribbble, Twitter, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutralGray py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-display font-bold text-xl mb-2">HuCreative Studio</h3>
          <p className="text-gray-500 text-sm mb-2">© {new Date().getFullYear()} All rights reserved.</p>
          <Link to="/admin/login" className="text-xs text-gray-700 hover:text-gray-500 flex items-center justify-center md:justify-start gap-1 transition-colors">
            <Lock size={10} /> Admin Access
          </Link>
        </div>

        <div className="flex gap-6">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-electric transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-electric transition-colors">
            <Dribbble size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-electric transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;