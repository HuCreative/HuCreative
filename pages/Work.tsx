import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorkGrid from '../components/WorkGrid';
import ProjectModal from '../components/ProjectModal';
import { EMAIL } from '../constants';
import { useData } from '../context/DataContext';
import { Project } from '../types';
import Button from '../components/ui/Button';

const Work: React.FC = () => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">Selected Works</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm md:text-base">
          A collection of projects where design meets purpose. From brand identities to digital experiences.
        </p>
      </motion.div>

      <WorkGrid projects={projects} onProjectClick={setSelectedProject} />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 p-12 bg-neutralGray border border-white/5 text-center"
      >
        <h2 className="font-display font-bold text-3xl mb-4">Have a project in mind?</h2>
        <p className="text-gray-400 mb-8">I'm currently available for freelance work.</p>
        <Button href={`mailto:${EMAIL}`} variant="primary">Start a Project</Button>
      </motion.div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Work;