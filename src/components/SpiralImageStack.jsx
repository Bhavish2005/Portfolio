import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

export default function SpiralImageStack({ coverImage, title = 'Project' }) {
  const [isHovered, setIsHovered] = useState(false);

  // Spiral offset preset definitions for 3 stacked cards
  const spiralTransforms = [
    // Front Main Card (Cover Image)
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
        }}
      >
        {/* Card 2 Behind (Blank) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            transform: isHovered ? spiralTransforms[2].hover : spiralTransforms[2].default,
            zIndex: spiralTransforms[2].zIndex,
            opacity: spiralTransforms[2].opacity,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
           <ImageIcon size={32} color="rgba(0,0,0,0.1)" />
        </div>

        {/* Card 1 Behind (Blank) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            transform: isHovered ? spiralTransforms[1].hover : spiralTransforms[1].default,
            zIndex: spiralTransforms[1].zIndex,
            opacity: spiralTransforms[1].opacity,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
           <ImageIcon size={40} color="rgba(0,0,0,0.1)" />
        </div>

        {/* Front Main Card (Cover Image) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.08)',
            backgroundColor: '#ffffff',
            transform: isHovered ? spiralTransforms[0].hover : spiralTransforms[0].default,
            zIndex: spiralTransforms[0].zIndex,
            opacity: spiralTransforms[0].opacity,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <img
            src={coverImage || '/assets/project-placeholder.png'}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
  );
}
