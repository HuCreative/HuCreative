import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Message, Order, ProjectCategory } from '../types';
import { INITIAL_PROJECTS, INITIAL_MESSAGES, INITIAL_ORDERS } from '../constants';

interface DataContextType {
  projects: Project[];
  messages: Message[];
  orders: Order[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or constants
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('hu_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('hu_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('hu_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Persist to localStorage
  useEffect(() => localStorage.setItem('hu_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('hu_messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('hu_orders', JSON.stringify(orders)), [orders]);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects([newProject, ...projects]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addMessage = (msgData: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...msgData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    setMessages([newMessage, ...messages]);
  };

  const markMessageRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <DataContext.Provider value={{
      projects,
      messages,
      orders,
      addProject,
      updateProject,
      deleteProject,
      addMessage,
      markMessageRead,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};