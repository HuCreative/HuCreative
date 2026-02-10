import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatBot from './components/ChatBot';
import LoadingScreen from './components/LoadingScreen';
import BackgroundBlobs from './components/BackgroundBlobs';
import CursorTrail from './components/CursorTrail';

// Admin imports
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import Messages from './pages/admin/Messages';
import Orders from './pages/admin/Orders';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Public layout wrapper to keep Navbar/Footer only on public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-charcoal text-main font-sans selection:bg-electric selection:text-white transition-colors duration-300 relative">
    {/* Global Background Effects */}
    <BackgroundBlobs />
    
    <Navbar />
    <main className="flex-grow z-10">
      {children}
    </main>
    <Footer />
    <ChatBot />
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animation #5: Loading screen 2s timer
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataProvider>
      <AuthProvider>
        {/* Global Particles (only visible if reduced motion is off, handled in component) */}
        {!loading && <CursorTrail />}
        
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>

        {!loading && (
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="messages" element={<Messages />} />
                <Route path="orders" element={<Orders />} />
              </Route>

              {/* Public Routes */}
              <Route path="*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
          </Router>
        )}
      </AuthProvider>
    </DataProvider>
  );
}

export default App;