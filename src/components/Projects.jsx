import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Link } from 'react-router-dom';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { projectsData } from '../data/projects';

import SpiralImageStack from './SpiralImageStack';

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Ultra-premium 3D folding scale reveal
      cardsRef.current.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, scale: 0.8, y: 150, rotateX: 10 },
          { 
            opacity: 1, 
            scale: 1,
            y: 0, 
            rotateX: 0,
            duration: 1.2, 
            ease: "expo.out",
            scrollTrigger: {
              trigger: card.parentElement,
              start: "top 90%", 
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '4rem 0 10rem 0', position: 'relative' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center', color: 'var(--text-primary)' }}>Featured Work</h2>
        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              style={{ 
                position: 'sticky',
                top: `calc(100px + ${index * 30}px)`, 
                zIndex: index,
                perspective: '1000px'
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
        ))}
      </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
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
