import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Link } from 'react-router-dom';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { projectsData } from '../data/projects';

import SpiralImageStack from './SpiralImageStack';

const MobileProjectSlider = ({ projectsData }) => {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > minSwipeDistance) {
      setActive(prev => (prev === projectsData.length - 1 ? 0 : prev + 1));
    } else if (distance < -minSwipeDistance) {
      setActive(prev => (prev === 0 ? projectsData.length - 1 : prev - 1));
    }
  }

  return (
    <div 
      style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden', padding: '1rem 0 2rem 0', perspective: '1200px' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div style={{ display: 'flex', width: '100%', position: 'relative', minHeight: '480px' }}>
         {projectsData.map((project, index) => {
           const isActive = index === active;
           const diff = index - active;
           
           let xPos = '100%';
           let scale = 0.85;
           let opacity = 0;
           let zIndex = 0;
           let rotateY = 15;

           if (isActive) {
             xPos = '0%';
             scale = 1;
             opacity = 1;
             zIndex = 10;
             rotateY = 0;
           } else if (diff === 1 || (active === projectsData.length - 1 && index === 0)) {
             xPos = '85%'; 
             scale = 0.88;
             opacity = 0.5;
             zIndex = 5;
             rotateY = -12;
           } else if (diff === -1 || (active === 0 && index === projectsData.length - 1)) {
             xPos = '-85%';
             scale = 0.88;
             opacity = 0.5;
             zIndex = 5;
             rotateY = 12;
           } else if (diff > 1) {
             xPos = '100%';
             opacity = 0;
           } else {
             xPos = '-100%';
             opacity = 0;
           }
           
           return (
             <div 
               key={project.id}
               style={{
                 position: isActive ? 'relative' : 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 transform: `translateX(${xPos}) scale(${scale}) rotateY(${rotateY}deg)`,
                 opacity: opacity,
                 zIndex: zIndex,
                 pointerEvents: isActive ? 'auto' : 'none',
                 transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                 padding: '0 1rem', // Give cards a little padding from the physical screen edge
                 boxSizing: 'border-box'
               }}
             >
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', borderRadius: '24px', background: 'var(--surface)', height: '100%' }}>
                   <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '1.5rem', flexShrink: 0 }}>
                     <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   </div>
                   
                   <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                     <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{project.title}</h3>
                     <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{project.subtitle}</h4>
                     
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                       {project.tools.slice(0, 4).map(tool => (
                         <span key={tool} style={{ padding: '0.35rem 0.75rem', background: 'var(--bg-primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                           {tool}
                         </span>
                       ))}
                     </div>
                     
                     <Link to={`/project/${project.id}`} style={{
                       marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', width: '100%', backgroundColor: 'var(--text-primary)', color: '#fff', textDecoration: 'none', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600
                     }}>
                       View Project <ArrowUpRight size={16} />
                     </Link>
                   </div>
                </div>
             </div>
           );
         })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', marginTop: '1.5rem' }}>
        {projectsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              width: active === idx ? '24px' : '8px',
              height: '8px',
              borderRadius: '50px',
              background: active === idx ? 'var(--text-primary)' : 'var(--border-hover)',
              border: 'none',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const scrubWrappersRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // DESKTOP: Premium Sticky Stacking Animation
      
      // 1. Entrance reveal (on the inner card)
      cardsRef.current.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: card.parentElement,
              start: "top 85%", 
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 2. Flawless Sticky Stacking Background Effect (applied to the intermediate wrapper)
      scrubWrappersRef.current.forEach((scrubWrapper, i) => {
        if (i < scrubWrappersRef.current.length - 1) {
          gsap.to(scrubWrapper, {
            scale: 0.9,
            filter: "blur(12px)",
            transformOrigin: "top center",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: scrubWrapper.parentElement, // Use the sticky wrapper as the trigger reference
              start: `top ${100 + i * 30}px`, 
              end: `+=${window.innerHeight * 0.9}`, 
              scrub: true
            }
          });
        }
      });
    });

    // CRITICAL FIX: Images and layout shifts above this section cause ScrollTrigger to 
    // calculate the start/end positions incorrectly on initial mount. 
    // We must refresh ScrollTrigger after the layout settles so it calculates the true positions.
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    
    // Refresh after a slight delay to account for initial DOM rendering
    const timeoutId = setTimeout(refreshScrollTrigger, 500);
    const timeoutId2 = setTimeout(refreshScrollTrigger, 1500);
    
    // Also refresh on full window load (when all images have finished loading)
    window.addEventListener('load', refreshScrollTrigger);

    return () => {
      mm.revert();
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      window.removeEventListener('load', refreshScrollTrigger);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '4rem 0 10rem 0', position: 'relative' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center', color: 'var(--text-primary)' }}>Featured Work</h2>
        
        {isMobile ? (
          <MobileProjectSlider projectsData={projectsData} />
        ) : (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {projectsData.map((project, index) => (
              <div 
                key={project.id} 
                className="project-sticky-wrapper"
                style={{ 
                  top: `calc(100px + ${index * 30}px)`, 
                  zIndex: index,
                  perspective: '1000px'
                }}
              >
              <div 
                ref={el => scrubWrappersRef.current[index] = el}
                className="project-gsap-scrub-wrapper"
                style={{
                  willChange: 'transform, filter',
                  filter: 'blur(0px)'
                }}
              >
                <div
                  ref={el => cardsRef.current[index] = el}
                  className="glass-panel project-card-split"
                  style={{ 
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.05)',
                    transformOrigin: 'top center',
                    willChange: 'transform, opacity',
                    overflow: 'hidden',
                    padding: 0
                  }}
                >
              
              {/* Image Stack Container with Spiral Stacked Cards Effect */}
              <div className="project-image-container" style={{ 
                flex: '1 1 45%',
                background: 'transparent',
                position: 'relative',
                minHeight: '340px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <SpiralImageStack 
                  coverImage={project.coverImage} 
                  gallery={project.gallery} 
                  title={project.title} 
                />
              </div>

              {/* Text Container */}
              <div className="project-text-container" style={{ 
                flex: '1 1 55%',
                padding: '4rem',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                    <h4 style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 500 }}>{project.subtitle}</h4>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>{project.year}</div>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                  {project.description}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto' }}>
                  {project.tools.map(tool => (
                    <span key={tool} style={{ 
                      padding: '0.5rem 1.2rem', 
                      background: 'var(--bg-primary)', 
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-light)'
                    }}>
                      {tool}
                    </span>
                  ))}
                </div>
                
                <div style={{ marginTop: '2.5rem' }}>
                  <Link to={`/project/${project.id}`} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--text-primary)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'transform 0.2s ease, opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    View More <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
          </div>
        ))}
        </div>
        )}
      </div>
      
      <style>{`
        @media (min-width: 769px) {
          .project-sticky-wrapper {
            position: sticky;
          }
        }
        @media (max-width: 768px) {
          .project-card-split {
            flex-direction: column !important;
          }
          .project-text-container {
            padding: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
