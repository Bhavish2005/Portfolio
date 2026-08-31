import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import InteractiveBackground from './components/InteractiveBackground';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

import PortfolioTracker from './components/PortfolioTracker';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="portfolio-app">
        {/* Minimal Interactive Background Elements & 3D Cursor Highlight (z-index: -3) */}
        <InteractiveBackground />

        {/* Global Smart Navbar */}
        <Navbar />

        {/* Multi-Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        
        {/* Global Portfolio Tracker */}
        <PortfolioTracker />

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)' }}>
          <p>© 2026 Bhavish Pushkarna. Designed & Engineered with precision.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
