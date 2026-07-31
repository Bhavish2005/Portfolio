import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ResumeShowcase from '../components/ResumeShowcase';
import Contact from '../components/Contact';
import PortfolioAssistant from '../components/PortfolioAssistant';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 100;
    const currentFrame = index => `/face-sequence/frame_${index.toString().padStart(4, '0')}.png`;

    const images = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Animation state (defaults overridden via matchMedia later)
    const animState = {
      frame: 0,
      xOffset: 0, 
      yOffset: 0,
      scale: 1, 
      blur: 0,
      opacity: 0
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let img = null;
      for (let i = Math.floor(animState.frame); i >= 0; i--) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
          img = images[i];
          break;
        }
      }

      if (img) {
        context.globalAlpha = animState.opacity;
        context.filter = `blur(${animState.blur}px)`;


        const ratio = canvas.height / img.height;
        // Scale to 1.05x of screen height
        const scale = ratio * 1.05 * animState.scale; 
        
        const w = img.width * scale;
        const h = img.height * scale;

        const cx = (canvas.width / 2) - (w / 2) + animState.xOffset;
        // Anchor exactly to the bottom so the chin is perfectly visible
        const cy = canvas.height - h + animState.yOffset;
        
        // Draw a smooth black radial glow/shape behind the face to enhance contrast
        const faceCenterX = cx + w / 2;
        const faceCenterY = cy + h / 2;
        const blobX = faceCenterX + (w * 0.1); // Shift the blob slightly to the right
        const gradientRadius = Math.max(w, h) * 0.60; // Make it large enough to cover the hair edges
        
        const gradient = context.createRadialGradient(
          blobX, faceCenterY, 0, 
          blobX, faceCenterY, gradientRadius
        );
        // Slightly more visible glow as requested
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.20)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(faceCenterX, faceCenterY, gradientRadius, 0, Math.PI * 2);
        context.fill();

        // Draw the face image on top of the black shape
        context.drawImage(img, cx, cy, w, h);
      }
    };

    images[0].onload = render;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      // Set initial values based on device
      animState.xOffset = isDesktop ? window.innerWidth * 0.28 : 0;
      animState.opacity = isDesktop ? 1 : 0;
      // Re-render immediately with the correct initial state
      render();

      // 1. Scrub through frames over the entire page scroll
      gsap.to(animState, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: render
      });

      if (isMobile) {
        // Mobile: Sequence opacity fade in, then fade out
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1.5,
          },
          onUpdate: render
        });
        
        tl.to(animState, { opacity: 0.85, ease: "power1.inOut", duration: 1 })
          .to(animState, { opacity: 0.25, ease: "power1.inOut", duration: 2 });
          
        gsap.to(animState, {
          xOffset: 0,
          scale: 1.2,
          blur: 8,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", 
            scrub: 1.5,    
          },
          onUpdate: render
        });
      } else {
        // 2. Cinematic Transition out of Hero Section
        // Moves face to center, scales it up slightly, blurs it gently, and fades it out
        gsap.to(animState, {
          xOffset: 0,
          scale: 1.2,
          blur: 8,
          opacity: 0.25,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", // Transition happens much more gradually over 150vh
            scrub: 1.5,    // Softer scrub interpolation
          },
          onUpdate: render
        });
      }

    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update xOffset dynamically if they are at the top to maintain alignment
      if (window.scrollY < 50) {
        animState.xOffset = window.innerWidth > 768 ? window.innerWidth * 0.28 : 0;
      }
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mm.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* Global Fixed Canvas Background */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: -1, // Sits behind the text content
          pointerEvents: 'none' 
        }} 
      />

      <Navbar />
      <Hero />
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <ResumeShowcase />
      <div id="contact"><Contact /></div>

      {/* Floating RAG AI Portfolio Assistant */}
      <PortfolioAssistant />
    </div>
  );
};

export default Home;
