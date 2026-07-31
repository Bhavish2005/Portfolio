import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const sections = ['About', 'Skills', 'Projects', 'Resumes', 'Contact'];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        if (window.scrollY < 250) {
          setIsVisible(false);
          setActiveSection(''); 
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
    setIsMobileMenuOpen(false);
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
    <nav className="navbar-container" style={{
      position: 'fixed',
      top: '1.5rem',
      left: isMobile ? 'auto' : '50%',
      right: isMobile ? '1.5rem' : 'auto',
      width: isMobile ? 'fit-content' : 'auto',
      transform: isMobile ? `translate(0, ${isVisible ? '0' : '-150%'})` : `translate(-50%, ${isVisible ? '0' : '-150%'})`,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, left 0.4s ease, background 0.3s, backdrop-filter 0.3s, border 0.3s, box-shadow 0.3s',
      zIndex: 9999,
      background: (isMobile && isMobileMenuOpen) ? 'transparent' : (isMobile ? 'transparent' : 'rgba(255, 255, 255, 0.7)'),
      backdropFilter: (isMobile && isMobileMenuOpen) ? 'none' : 'blur(12px)',
      WebkitBackdropFilter: (isMobile && isMobileMenuOpen) ? 'none' : 'blur(12px)',
      padding: (isMobile && isMobileMenuOpen) ? '0' : '0.75rem 2rem',
      borderRadius: '50px',
      boxShadow: (isMobile && isMobileMenuOpen) ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      border: (isMobile && isMobileMenuOpen) ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      alignItems: 'center'
    }}>
      {/* Mobile Hamburger Header */}
      {isMobile && !isMobileMenuOpen && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              padding: 0,
              lineHeight: 0,
            }}
          >
            <Menu size={20} style={{ display: 'block' }} />
          </button>
        </div>
      )}

      {/* Nav Links Container */}
      <div 
        className="nav-links"
        style={{
          display: isMobile ? (isMobileMenuOpen ? 'flex' : 'none') : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.5rem' : '2.5rem',
          width: isMobile ? 'auto' : '100%',
          alignItems: isMobile ? 'flex-end' : 'center',
          marginTop: (isMobile && isMobileMenuOpen) ? '0.5rem' : '0'
        }}
      >
        {sections.map((item) => {
          const sectionId = item.toLowerCase();
          const isActive = activeSection === sectionId;
          
          return (
            <button
              key={item}
              className="nav-btn"
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
                transition: 'all 0.3s ease',
                width: 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#555'; }}
              onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-primary)'; }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
