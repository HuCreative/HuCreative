import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, EMAIL } from '../constants';
import { Download, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden bg-neutralGray rounded-2xl border border-main/10 relative group">
             <img 
               src="https://picsum.photos/800/1200?grayscale" 
               alt="Pankaj" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute bottom-6 left-6 right-6 bg-charcoal/90 backdrop-blur p-4 rounded-xl border border-electric/20">
                <div className="text-electric font-bold font-display text-xl mb-1">Pankaj Singh Bisht</div>
                <div className="text-xs font-mono text-muted">Class 12 Student & Founder</div>
             </div>
          </div>
        </motion.div>

        {/* Text Side - Story Arc */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 bg-electric/10 text-electric text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              The Anti-Agency
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 text-main">
              I balance Physics equations and <span className="text-electric">Pixel Perfection.</span>
            </h1>
            
            <div className="space-y-4 text-muted leading-relaxed text-lg">
              <p>
                <strong className="text-main">Hi, I'm Pankaj.</strong> Most web designers try to sound like big corporate agencies. I'm not.
              </p>
              <p>
                I'm a Class 12 student from Dehradun. While my peers are stressing over exams, I'm obsessing over conversion rates, SEO, and user experience.
              </p>
              <p>
                Why does this matter to you?
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-mint shrink-0 mt-1" size={18} />
                  <span><strong className="text-main">Hunger:</strong> I have to prove myself every single day. I work harder than any 9-5 employee.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-mint shrink-0 mt-1" size={18} />
                  <span><strong className="text-main">Fair Pricing:</strong> You aren't paying for a fancy office or a CEO's salary. You pay for raw talent.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-mint shrink-0 mt-1" size={18} />
                  <span><strong className="text-main">Direct Access:</strong> No account managers. You talk directly to the guy building your site.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-4"
          >
             <Button href={`mailto:${EMAIL}`} variant="primary">
               Work With Me <ArrowRight size={18} />
             </Button>
             <Button variant="outline" className="gap-2">
               Download Resume <Download size={16} />
             </Button>
          </motion.div>
        </div>
      </div>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-display font-bold text-3xl mb-12 text-center text-main">My Journey So Far</h2>
        <div className="space-y-12 border-l border-main/10 pl-8 md:pl-12 relative">
          {EXPERIENCE.map((item, index) => (
            <div key={index} className="relative group">
              <span className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-charcoal border-2 border-electric group-hover:scale-125 transition-transform" />
              <span className="block text-electric font-mono text-sm mb-2">{item.year}</span>
              <h3 className="text-xl font-bold text-main mb-1">{item.role}</h3>
              <p className="text-muted font-mono text-sm mb-4">{item.company}</p>
              <p className="text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;