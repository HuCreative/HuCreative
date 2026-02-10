import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, ArrowRight } from 'lucide-react';
import { EMAIL } from '../constants';
import Button from './ui/Button';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          layoutId={`project-${project.id}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="relative w-full max-w-4xl bg-darkGray border border-white/10 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-charcoal/50 rounded-full hover:bg-electric transition-colors text-white"
          >
            <X size={24} />
          </button>

          <div className="aspect-video w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                  {project.title}
                </h2>
                <div className="flex gap-2">
                   <span className="text-electric font-mono text-sm">{project.category}</span>
                   <span className="text-gray-500 font-mono text-sm">• {project.year}</span>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-white/5 text-xs font-mono text-gray-300 border border-white/5">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2">The Challenge</h3>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>
                <div>
                   <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2">Process</h3>
                   <p className="text-gray-300 leading-relaxed">
                     We started with deep research into the target demographic, exploring visual styles that resonate with modern aesthetics. Iterative prototyping led us to this final clean, impactful design.
                   </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider">Key Deliverables</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Brand Identity System</li>
                  <li>Digital Assets</li>
                  <li>User Interface Design</li>
                  <li>Marketing Collaterals</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="bg-charcoal p-8 flex flex-col items-center text-center gap-4 border border-white/5">
                <h3 className="font-display font-bold text-2xl">Like this project?</h3>
                <p className="text-gray-400">Let's create something similar for your brand.</p>
                <Button 
                  href={`mailto:${EMAIL}?subject=Project Inquiry: ${project.title} style&body=Hello Pankaj, I’m interested in a project similar to ${project.title}.`}
                  variant="primary"
                >
                  Work With Me On This
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;