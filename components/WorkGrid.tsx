import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../types';
import ProjectCard from './ProjectCard';

interface WorkGridProps {
  projects: Project[];
  limit?: number;
  showFilters?: boolean;
  onProjectClick: (project: Project) => void;
}

const categories: ProjectCategory[] = ['All', 'Logo', 'Web UI', 'Poster'];

const WorkGrid: React.FC<WorkGridProps> = ({ projects, limit, showFilters = true, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-electric border-electric text-white'
                  : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WorkGrid;