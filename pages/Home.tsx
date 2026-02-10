import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import WorkGrid from '../components/WorkGrid';
import Pricing from '../components/Pricing';
import PromoBanner from '../components/PromoBanner';
import ValueProps from '../components/ValueProps';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Button from '../components/ui/Button';
import ProjectModal from '../components/ProjectModal';
import { SERVICES } from '../constants';
import { useData } from '../context/DataContext';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-charcoal min-h-screen">
      
      {/* Top Banner Section - Sits below fixed navbar */}
      <div className="pt-20">
        <PromoBanner />
      </div>

      {/* Hero Section: Pain + Promise + Proof */}
      <div className="relative">
         <Hero />
      </div>

      {/* About / Why Me Snippet (Replaces ValueProps location for flow) */}
      <section className="py-20 px-6 bg-neutralGray/5 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
           >
             <h2 className="font-display font-bold text-3xl mb-6">I'm Not An Agency. That's Your Advantage.</h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-8">
               Big agencies charge you for their office rent and coffee machines. I charge you for results. 
               As a student entrepreneur, I have to work harder, faster, and smarter to win your trust.
             </p>
             <Link to="/about" className="inline-flex items-center gap-2 text-electric font-bold hover:underline">
               Read My Story <ArrowRight size={16} />
             </Link>
           </motion.div>
        </div>
      </section>

      {/* Value Props: Objection Handling */}
      <ValueProps />

      {/* Services: 3 Packages */}
      <section className="py-24 px-6 bg-neutralGray/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">What I Can Do For You</h2>
            <p className="text-gray-400 font-mono">Full-service digital growth, minus the fluff.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects: Case Studies */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="work">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Proven Results</h2>
            <p className="text-gray-400">Don't just look at pretty pictures. Look at the numbers.</p>
          </motion.div>
          <Button href="/work" variant="outline">View All Case Studies</Button>
        </div>

        <WorkGrid 
          projects={projects} 
          limit={3} 
          showFilters={false} 
          onProjectClick={setSelectedProject} 
        />
      </section>

      {/* Testimonials: Social Proof */}
      <Testimonials />

      {/* Pricing Section: Anchored */}
      <div className="border-t border-white/5 bg-neutralGray/5">
        <Pricing />
      </div>

      {/* Final Call To Action: Urgency */}
      <CTASection />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Home;