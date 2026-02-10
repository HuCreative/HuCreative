import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { PenTool, Layout, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = {
  pen: PenTool,
  layout: Layout,
  image: ImageIcon,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = icons[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="p-8 border border-main/10 bg-neutralGray/30 hover:bg-neutralGray/50 transition-all duration-300 group flex flex-col h-full rounded-2xl"
    >
      <div className="mb-6 inline-flex p-4 bg-charcoal rounded-full border border-main/10 group-hover:border-electric/50 transition-colors w-16 h-16 items-center justify-center">
        <Icon className="text-electric" size={28} />
      </div>
      <h3 className="font-display font-bold text-2xl mb-4 text-main group-hover:text-electric transition-colors">
        {service.title}
      </h3>
      <p className="text-muted leading-relaxed mb-8 flex-grow">
        {service.description}
      </p>
      
      <div className="mt-auto pt-6 border-t border-main/5">
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-main hover:text-electric transition-colors uppercase tracking-wider">
          Start Now <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;