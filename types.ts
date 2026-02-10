export type ProjectCategory = 'All' | 'Logo' | 'Web UI' | 'Poster';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  tools: string[];
  year: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'pen' | 'layout' | 'image';
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  clientName: string;
  serviceType: string;
  status: OrderStatus;
  amount: number;
  date: string;
  notes?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  delivery: string;
  revisions: string;
  features: string[];
  bestFor: string;
}