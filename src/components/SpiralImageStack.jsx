import { useState } from 'react';
import { Layers, Maximize2, X, ChevronRight, ImageIcon } from 'lucide-react';

export default function SpiralImageStack({ coverImage, gallery = [], title = 'Project' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Combine cover and gallery into one array of preview cards
  const allImages = [coverImage, ...gallery].filter(Boolean);
  
  if (allImages.length === 0) {
    allImages.push('/assets/project-placeholder.png');
  }

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  // Spiral offset preset definitions for up to 4 stacked cards
  const spiralTransforms = [
    // Front Main Card
    {
      default: 'rotate(0deg) translate(0px, 0px) scale(1)',
      hover: 'rotate(-2deg) translate(-8px, -6px) scale(1.02)',
      zIndex: 10,
      opacity: 1,
    },
    // Card 1 Behind (Rotated Right)
    {
      default: 'rotate(7deg) translate(16px, 8px) scale(0.95)',
      hover: 'rotate(14deg) translate(36px, 16px) scale(0.96)',
      zIndex: 9,
      opacity: 0.9,
    },
    // Card 2 Behind (Rotated Left)
    {
      default: 'rotate(-8deg) translate(-16px, 14px) scale(0.90)',
      hover: 'rotate(-16deg) translate(-36px, 24px) scale(0.92)',
      zIndex: 8,
      opacity: 0.82,
    },
    // Card 3 Behind (Rotated Top-Right)
    {
      default: 'rotate(12deg) translate(24px, -12px) scale(0.85)',
      hover: 'rotate(22deg) translate(52px, -20px) scale(0.88)',
      zIndex: 7,
      opacity: 0.75,
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '340px',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '2.5rem',
        overflow: 'visible',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stacked Cards Spiral Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          aspectRatio: '16 / 10',
          cursor: 'pointer',
        }}
        onClick={handleNext}
        title="Click to cycle preview cards"
      >
        {allImages.map((imgSrc, index) => {
          // Calculate relative stack depth relative to activeIndex
          const relativePos = (index - activeIndex + allImages.length) % allImages.length;
          const transformPreset = spiralTransforms[Math.min(relativePos, spiralTransforms.length - 1)];

          const transformStyle = isHovered ? transformPreset.hover : transformPreset.default;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: relativePos === 0 
                  ? '0 20px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)' 
                  : '0 10px 25px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: '#ffffff',
                transform: transformStyle,
                zIndex: transformPreset.zIndex,
                opacity: transformPreset.opacity,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform',
              }}
            >
              <img
                src={imgSrc}
                alt={`${title} Preview ${index + 1}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Fallback card content if image path is not yet present */}
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justify: 'center',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  color: 'var(--text-primary)',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    margin: '0 auto',
                  }}
                >
                  <ImageIcon size={24} style={{ display: 'block', color: 'rgba(0, 0, 0, 0.5)' }} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {title} • Card {index + 1}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Interactive Preview Card
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Interactive Controls Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1.5rem',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '0.4rem 0.9rem',
          borderRadius: '50px',
          border: '1px solid var(--border-light)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'transform 0.2s ease',
        }}
        onClick={handleNext}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Layers size={14} />
        <span>{activeIndex + 1} / {allImages.length}</span>
        <ChevronRight size={14} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxImg(allImages[activeIndex]);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            marginLeft: '0.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
          }}
          title="Expand View"
        >
          <Maximize2 size={13} />
        </button>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt="Enlarged Preview"
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '12px',
              objectFit: 'contain',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
