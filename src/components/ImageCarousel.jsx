import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  
  // Clone the array 20 times for a virtually unbreakable infinite scroll
  // with lazy loading, the DOM impact is extremely minimal.
  const COPIES = 20;
  const displayImages = Array.from({ length: COPIES }).flatMap(() => images);
  const baseCount = images.length;
  const middleIndex = Math.floor(COPIES / 2) * baseCount;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Initial jump to the very middle of our massive array so they can scroll left or right infinitely
    const middleStartElement = container.children[middleIndex];
    if (middleStartElement) {
      container.scrollTo({ left: middleStartElement.offsetLeft, behavior: 'instant' });
    }

    // We removed the vertical mouse scroll hijacking so the user can scroll down the page naturally.

    // Continuous scroll listener for perfect, bug-free active index selection
    let isScrolling = false;
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          const center = container.scrollLeft + container.clientWidth / 2;
          let minDiff = Infinity;
          let closestIndex = activeIndex;
          
          Array.from(container.children).forEach((child) => {
             const childCenter = child.offsetLeft + child.clientWidth / 2;
             const diff = Math.abs(childCenter - center);
             if (diff < minDiff) {
                minDiff = diff;
                closestIndex = parseInt(child.dataset.index, 10);
             }
          });
          
          setActiveIndex(closestIndex % baseCount);
          isScrolling = false;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [baseCount, middleIndex]);

  const scrollToChild = (offset) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = -1;
    let minDiff = Infinity;
    
    Array.from(container.children).forEach((child, i) => {
       const childCenter = child.offsetLeft + child.clientWidth / 2;
       const diff = Math.abs(childCenter - center);
       if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
       }
    });

    const targetIndex = closestIndex + offset;
    if (targetIndex >= 0 && targetIndex < container.children.length) {
      const target = container.children[targetIndex];
      container.scrollTo({
        left: target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.02)', position: 'relative' }}>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => scrollToChild(-1)}
        style={{
          position: 'absolute',
          left: '5vw',
          top: '40%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'var(--surface)',
          border: '1px solid var(--border-light)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          color: 'var(--text-primary)',
          transition: 'transform 0.2s ease, background 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={() => scrollToChild(1)}
        style={{
          position: 'absolute',
          right: '5vw',
          top: '40%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'var(--surface)',
          border: '1px solid var(--border-light)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          color: 'var(--text-primary)',
          transition: 'transform 0.2s ease, background 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
      >
        <ChevronRight size={32} />
      </button>

      <div 
        ref={scrollRef}
        className="carousel-container"
        style={{ 
          width: '100%', 
          display: 'flex', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          gap: '2vw', 
          padding: '2rem 0', 
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {displayImages.map((img, index) => {
          const actualIndex = index % baseCount;
          const isActive = actualIndex === activeIndex;
          
          return (
            <div
              key={index}
              data-index={index}
              className="carousel-item"
              onClick={() => {
                const container = scrollRef.current;
                const target = container.children[index];
                if (target) {
                  container.scrollTo({
                    left: target.offsetLeft - container.offsetWidth / 2 + target.offsetWidth / 2,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                flex: '0 0 auto',
                width: '85vw',
                height: '80vh', 
                minHeight: '400px',
                maxHeight: '900px',
                scrollSnapAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                opacity: isActive ? 1 : 0.4,
                cursor: 'pointer',
                padding: '0 2vw' // Slight padding to ensure images don't perfectly touch screen edges if they are 100vw wide
              }}
            >
              <img 
                src={img.src} 
                alt={img.title || `Image ${actualIndex + 1}`} 
                loading="lazy"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain', 
                  display: 'block', 
                  borderRadius: '24px',
                  transition: 'all 0.6s ease',
                  transform: isActive ? 'scale(1)' : 'scale(0.95)'
                }} 
              />
            </div>
          );
        })}
      </div>

      <style>{`
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        .carousel-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      
      <div style={{ marginTop: '1rem', height: '3.5rem', textAlign: 'center', transition: 'opacity 0.3s' }}>
         <h4 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 0.75rem 0', fontWeight: 600, letterSpacing: '-0.01em' }}>
           {images[activeIndex]?.title || `Image ${activeIndex + 1}`}
         </h4>
         <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '80vw' }}>
           {images.map((_, i) => (
             <div 
               key={i} 
               style={{ 
                 width: i === activeIndex ? '28px' : '8px', 
                 height: '8px', 
                 borderRadius: '4px', 
                 background: i === activeIndex ? 'var(--text-primary)' : 'rgba(0,0,0,0.12)',
                 transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                 marginBottom: '0.25rem'
               }} 
             />
           ))}
         </div>
      </div>
    </div>
  );
}
