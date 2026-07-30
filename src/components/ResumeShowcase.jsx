import { useState, useRef, useEffect } from 'react';
import { FileText, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { candidateProfile } from '../data/portfolioContext';

export default function ResumeShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const headingTextRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const totalSlides = candidateProfile.resumes.length;

  // GSAP Horizontal Slide Transition & Heading Text Animate
  useEffect(() => {
    if (!trackRef.current) return;

    // Track shift
    const shiftPercent = -activeSlide * (100 / totalSlides);
    gsap.to(trackRef.current, {
      xPercent: shiftPercent,
      duration: 0.7,
      ease: 'power3.inOut',
    });

    // Heading text entrance animation
    if (headingTextRef.current) {
      gsap.fromTo(
        headingTextRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }

    // Tab sliding indicator movement
    const activeTabEl = tabRefs.current[activeSlide];
    if (activeTabEl && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        left: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }

    // Card scale & opacity focus
    cardRefs.current.forEach((card, idx) => {
      if (card) {
        if (idx === activeSlide) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          gsap.to(card, {
            opacity: 0.35,
            scale: 0.96,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      }
    });
  }, [activeSlide, totalSlides]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section id="resumes" style={{ padding: '6rem 0 8rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
            Curated Resumes
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            Explore tailored resume variants engineered for specific domain competencies. Use the domain tabs or slider controls to switch focus areas.
          </p>
        </div>

        {/* GSAP Tab Selector Navigation */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2.5rem' 
          }}
        >
          <div 
            style={{ 
              position: 'relative',
              display: 'inline-flex',
              background: 'var(--surface)',
              border: '1px solid var(--border-light)',
              borderRadius: '50px',
              padding: '0.35rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            {/* GSAP Sliding Tab Background Pill */}
            <div
              ref={indicatorRef}
              style={{
                position: 'absolute',
                top: '0.35rem',
                bottom: '0.35rem',
                left: 0,
                width: 0,
                background: 'var(--text-primary)',
                borderRadius: '50px',
                zIndex: 1,
                willChange: 'left, width',
              }}
            />

            {candidateProfile.resumes.map((res, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={res.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveSlide(idx)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'none',
                    border: 'none',
                    padding: '0.55rem 1.4rem',
                    borderRadius: '50px',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  0{idx + 1}. {res.title.split(' Resume')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Slider Wrapper */}
        <div 
          style={{ 
            position: 'relative', 
            maxWidth: '780px', 
            margin: '0 auto', 
            overflow: 'hidden',
            borderRadius: '24px',
            padding: '8px 0',
          }}
        >
          {/* GSAP Sliding Track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              width: `${totalSlides * 100}%`,
              willChange: 'transform',
            }}
          >
            {candidateProfile.resumes.map((resume, idx) => {
              return (
                <div
                  key={resume.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{
                    width: `${100 / totalSlides}%`,
                    padding: '0 0.5rem',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    className="glass-panel"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      padding: '3.5rem 3rem',
                      minHeight: '440px',
                      borderRadius: '24px',
                      border: '1px solid var(--border-light)',
                      background: 'var(--surface)',
                      boxShadow: '0 15px 45px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div>
                      {/* Top Header - Removed Circle Icon */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2rem' }}>
                        {/* Slide Counter */}
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                          0{idx + 1} / 0{totalSlides}
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 style={{ fontSize: '2.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                        {resume.title}
                      </h3>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '1.75rem', lineHeight: '1.5' }}>
                        {resume.subtitle}
                      </h4>

                      {/* Focus Callout */}
                      <div 
                        style={{ 
                          padding: '1.1rem 1.25rem', 
                          borderRadius: '12px', 
                          background: 'var(--bg-primary)', 
                          marginBottom: '1.75rem', 
                          borderLeft: '2px solid var(--text-primary)' 
                        }}
                      >
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                          Target Focus: {resume.focus}
                        </p>
                      </div>

                      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                        {resume.description}
                      </p>

                      {/* Skill Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                        {resume.tags.map(tag => (
                          <span 
                            key={tag}
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              padding: '0.35rem 0.85rem',
                              borderRadius: '50px',
                              background: 'var(--bg-primary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-light)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link */}
                    <div>
                      <a
                        href={resume.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '100%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justify: 'center',
                          gap: '0.5rem',
                          padding: '1rem 1.75rem',
                          borderRadius: '50px',
                          background: 'var(--text-primary)',
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          transition: 'opacity 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <FileText size={18} style={{ display: 'block' }} /> View Resume Document <ArrowUpRight size={16} style={{ display: 'block' }} />
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem' }}>
          <button
            onClick={handlePrev}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            title="Previous Resume"
          >
            <ChevronLeft size={20} style={{ display: 'block', margin: 0, lineHeight: 0, flexShrink: 0 }} />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {candidateProfile.resumes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                style={{
                  width: activeSlide === idx ? '26px' : '9px',
                  height: '9px',
                  borderRadius: '50px',
                  background: activeSlide === idx ? 'var(--text-primary)' : 'var(--border-hover)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0,
                }}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            title="Next Resume"
          >
            <ChevronRight size={20} style={{ display: 'block', margin: 0, lineHeight: 0, flexShrink: 0 }} />
          </button>
        </div>

      </div>
    </section>
  );
}
