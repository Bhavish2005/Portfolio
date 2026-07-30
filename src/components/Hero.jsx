import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const bgTextRef = useRef(null);
  
  // Typewriter effect state
  const words = ["CS UnderGraduate", "Full Stack Developer", "System Architecture Engineer"];
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % words.length;
    const fullText = words[i];
    
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentWord(fullText.substring(0, currentWord.length - 1));
        if (currentWord === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentWord(fullText.substring(0, currentWord.length + 1));
        if (currentWord === fullText) {
          timer = setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(textRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      )
      .fromTo(subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      );

      // Parallax fade for the background typewriter text
      gsap.to(bgTextRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        minHeight: '100vh', 
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%', // Fluid padding for Left alignment
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Massive Background Typewriter Text (Z-Index: -2 to sit behind global canvas which is -1) */}
      <div 
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '50%', // Vertically centered
          left: '5vw', // Aligned perfectly with the Hero Content
          transform: 'translate(0%, -50%)', // Removed X translation so it stays on the left
          fontSize: 'clamp(2.5rem, 8vw, 6rem)', // Smaller font size to scale gracefully
          fontWeight: 900,
          color: 'var(--text-primary)',
          opacity: 0.03, 
          whiteSpace: 'pre-wrap', // Allows text to wrap to the next line
          width: '550px', // Restricts it to match the left section width
          textAlign: 'center', // Centered within the left section
          lineHeight: '1.1',
          zIndex: -2,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em'
        }}
      >
        {currentWord}
        <span style={{ animation: 'blink 1s step-end infinite', opacity: 1 }}>|</span>
      </div>

      {/* Hero Content - Aligned Left (Z-Index: 1) */}
      <div style={{ 
        maxWidth: '550px', // Restricted width to strictly prevent overlapping with the face
        zIndex: 1,
        position: 'relative',
        marginLeft: '5vw' // Push slightly from the absolute left edge
      }}>
        
        <div ref={textRef} style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
            Architecting Intelligence
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.03em', textShadow: '0 4px 20px rgba(255,255,255,0.9)' }}>
            <span style={{ fontWeight: 800 }}>Bhavish Pushkarna</span>
          </h1>
        </div>
        
        <p ref={subtextRef} style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-primary)',
          lineHeight: '1.8',
          fontWeight: 500,
          textShadow: '0 2px 10px rgba(255,255,255,0.7)',
          padding: '1.5rem 0',
          textAlign: 'justify' 
        }}>
          I don't just write code , I obsess over how complex systems breathe and scale. From engineering intricate Generative AI pipelines to squeezing every ounce of speed out of High-Performance Computing architectures, I push the absolute boundaries of what real-time systems can achieve. I build solutions that don't just work , they perform relentlessly.
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
