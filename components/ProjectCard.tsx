import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// Animation #4: Hover effects—image zoom 1.1, overlay text slide-up.
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      // Animation #3: Scroll-triggered fade-in handled by parent AnimatePresence/WorkGrid, 
      // but individual cards can also have viewport triggers if needed.
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer p-3 rounded-2xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-neutralGray mb-4 rounded-xl">
        {/* Image Zoom */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Overlay Slide-up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform ease-out">
          <span className="font-mono text-electric text-xs uppercase tracking-widest mb-2">View Case Study</span>
          <h3 className="text-white font-display font-bold text-xl">{project.title}</h3>
        </div>
      </div>
      
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="font-display font-bold text-xl text-main mb-1 group-hover:text-electric transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-muted uppercase tracking-wider">
            {project.category}
          </p>
        </div>
        <div className="p-2 rounded-full transition-colors duration-300 group-hover:bg-electric/10">
          <ArrowUpRight className="text-gray-500 group-hover:text-electric transition-colors duration-300" size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;