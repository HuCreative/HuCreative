import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: "We went from 0 online orders to fully booked weekends in just 3 weeks. Pankaj's QR menu system saved our business during the slowdown.",
    author: "Rahul V.",
    role: "Owner, Cafe Dehradun",
    metric: "300% Revenue Increase",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    text: "I was hesitant to hire a student, but Pankaj works faster than the agency we paid ₹50k to. The new site is capturing 50+ student leads weekly.",
    author: "Mrs. Sharma",
    role: "Director, Doon Tutors",
    metric: "50+ Leads/Week",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    text: "The branding he created for our trekking company looks like it costs thousands of dollars. We are now ranking #1 on Google Maps in the region.",
    author: "Amit Singh",
    role: "Founder, Himalaya Treks",
    metric: "#1 Google Rank",
    image: "https://picsum.photos/100/100?random=12"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-charcoal relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-main">Results Speak Louder</h2>
          <p className="text-muted font-mono">Real business owners. Real money made.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-neutralGray/20 p-8 rounded-2xl border border-main/10 relative group hover:bg-neutralGray/40 transition-colors flex flex-col h-full"
            >
              <Quote className="absolute top-6 right-6 text-main/5 group-hover:text-electric/20 transition-colors" size={40} />
              
              <div className="mb-6 flex gap-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
              </div>

              <p className="text-muted text-base leading-relaxed mb-6 flex-grow">
                "{item.text}"
              </p>
              
              <div className="pt-6 border-t border-main/10">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-10 h-10 rounded-full object-cover border border-main/10"
                  />
                  <div>
                    <h4 className="font-bold text-main font-display text-sm">{item.author}</h4>
                    <p className="text-xs text-muted font-mono uppercase tracking-wide">{item.role}</p>
                  </div>
                </div>
                <div className="bg-electric/10 text-electric text-xs font-bold py-2 px-3 rounded-lg text-center font-mono">
                   {item.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;