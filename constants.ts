import { Project, Service, TimelineItem, Message, Order, PricingPlan } from './types';
import { PenTool, Layout, Image as ImageIcon } from 'lucide-react';

export const EMAIL = "pankajsinghbisht2008@gmail.com";
export const INSTAGRAM = "https://instagram.com/veltone.store";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cafe Dehradun',
    category: 'Web UI',
    image: 'https://picsum.photos/800/600?random=1',
    description: 'Local bakery struggling with zero online orders. built a QR-menu website.',
    tools: ['React', 'SEO', 'G-Maps'],
    year: 'Before: 0 Orders → After: 300% Revenue Boost'
  },
  {
    id: '2',
    title: 'Doon Tutors Academy',
    category: 'Web UI',
    image: 'https://picsum.photos/800/600?random=2',
    description: 'Coaching center needed more leads. Redesigned landing page with lead magnets.',
    tools: ['Figma', 'Copywriting'],
    year: 'Result: 50+ Student Inquiries/Week'
  },
  {
    id: '3',
    title: 'Himalaya Treks',
    category: 'Poster',
    image: 'https://picsum.photos/800/1000?random=3',
    description: 'Adventure company wanted US/UK clients. Created premium visual identity.',
    tools: ['Photoshop', 'Branding'],
    year: 'Result: #1 Google Rank in Region'
  },
  {
    id: '4',
    title: 'TechStart India',
    category: 'Logo',
    image: 'https://picsum.photos/800/600?random=4',
    description: 'Startup needed investor trust. Crafted minimalist identity system.',
    tools: ['Illustrator'],
    year: 'Result: Secured ₹10L Funding'
  },
  {
    id: '5',
    title: 'Veltone Fashion',
    category: 'Web UI',
    image: 'https://picsum.photos/800/600?random=5',
    description: 'Clothing brand with high cart abandonment. Optimized checkout flow.',
    tools: ['UX Design', 'Shopify'],
    year: 'Result: 2x Sales Conversion'
  },
  {
    id: '6',
    title: 'City Events Dehradun',
    category: 'Poster',
    image: 'https://picsum.photos/800/1000?random=6',
    description: 'Event needed ticket sales fast. Viral poster campaign design.',
    tools: ['Midjourney', 'Photoshop'],
    year: 'Result: Sold Out in 48 Hours'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'High-Converting Websites',
    description: 'Stop losing customers. I build sites that turn visitors into paying clients in 7 days.',
    icon: 'layout'
  },
  {
    id: 'brand',
    title: 'Authority Branding',
    description: 'Look bigger than you are. Logos and visuals that make you the #1 choice in Dehradun.',
    icon: 'pen'
  },
  {
    id: 'ads',
    title: 'Ad Creatives That Sell',
    description: 'Stop wasting money on ads that get ignored. Visuals designed to stop the scroll.',
    icon: 'image'
  }
];

export const EXPERIENCE: TimelineItem[] = [
  {
    year: '2024 - Present',
    role: 'Founder & Lead Designer',
    company: 'HuCreative Studio',
    description: 'Helping 15+ Dehradun businesses go digital while managing Class 12 Physics & Math.'
  },
  {
    year: '2023',
    role: 'Freelance Web Designer',
    company: 'Self-Employed',
    description: 'Generated ₹2 Lakh+ revenue for local clients through design optimization.'
  },
  {
    year: '2022',
    role: 'Student Learner',
    company: 'Self-Taught',
    description: 'Mastered React & Design Principles during summer breaks. Obsessed with conversion.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    tagline: 'Perfect for local shops & personal brands needing quick credibility.',
    price: '₹9,999',
    delivery: '5 Days',
    revisions: '2 Rounds',
    bestFor: 'Cafes, Tutors, Local Shops',
    features: [
      'One-Page High Converting Site',
      'Mobile-First Design (Everyone is on phone)',
      'WhatsApp Chat Integration',
      'Basic SEO (Get found on Google)',
      'Free Hosting Setup',
      '1 Month Support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    tagline: 'The "Business Scale-Up" package. My most popular option.',
    price: '₹24,999',
    delivery: '10 Days',
    revisions: 'Unlimited',
    bestFor: 'Startups, Agencies, Service Providers',
    features: [
      'Everything in Starter',
      '5-Page Authority Website',
      'Custom Booking/Lead Forms',
      'Professional Copywriting (Sales text)',
      'Logo Design Included',
      'Speed Optimization (<2s load time)',
      '3 Months Priority Support'
    ]
  },
  {
    id: 'dominance',
    name: 'Dominance Plan',
    tagline: 'Complete digital takeover. For those who want to crush competitors.',
    price: '₹49,999',
    delivery: '21 Days',
    revisions: 'Unlimited + Strategy',
    bestFor: 'Established Brands',
    features: [
      'Everything in Growth',
      'Full E-commerce/Dynamic Functionality',
      'Brand Identity System (Full Pack)',
      '5 Ad Creatives for Marketing',
      'Competitor Analysis Strategy',
      'Advanced SEO & Analytics Dashboard',
      'Dedicated Slack Support Channel'
    ]
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    name: 'Rahul Verma',
    email: 'rahul@bakery.com',
    message: 'I need that 300% revenue boost you mentioned. Lets talk.',
    date: '2024-05-15',
    read: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'o1',
    clientName: 'Doon Tutors',
    serviceType: 'Growth Plan',
    status: 'In Progress',
    amount: 24999,
    date: '2024-05-12'
  }
];