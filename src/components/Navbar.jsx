import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const sections = ['About', 'Skills', 'Projects', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        if (window.scrollY < 250) {
          setIsVisible(false);
          setActiveSection(''); // Clear active section in Hero
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Intersection Observer to detect active section
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Triggers when the section reaches the middle of the screen
      threshold: 0
    });

    sections.forEach(section => {
      const element = document.getElementById(section.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.toLowerCase());
        if (element) observer.unobserve(element);
      });
    };
  }, [location.pathname]);

  const handleScrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        gsap.to(window, { duration: 1.2, scrollTo: { y: `#${id}`, offsetY: 80 }, ease: "power3.inOut" });
      }, 100);
    } else {
      gsap.to(window, { duration: 1.2, scrollTo: { y: `#${id}`, offsetY: 80 }, ease: "power3.inOut" });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: `translate(-50%, ${isVisible ? '0' : '-150%'})`,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
      zIndex: 9999,
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      gap: '2.5rem'
    }}>
      {sections.map((item) => {
        const sectionId = item.toLowerCase();
        const isActive = activeSection === sectionId;
        
        return (
          <button
            key={item}
            onClick={() => handleScrollTo(sectionId)}
            style={{
              background: isActive ? 'var(--text-primary)' : 'none',
              color: isActive ? '#fff' : 'var(--text-primary)',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#555'; }}
            onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-primary)'; }}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
