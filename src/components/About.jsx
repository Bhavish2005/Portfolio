import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GithubStats from './GithubStats';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-fade", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%", // Waits until the section is higher up (face is centered) before triggering
        },
        y: 100, // Coming from further down as requested
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionGlassStyle = {
    background: 'transparent', // unified translucent backdrop
    backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)', 
    borderTop: '1px solid rgba(255, 255, 255, 0.4)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.4)'
  };

  return (
    <section ref={sectionRef} style={{ padding: '6rem 0', ...sectionGlassStyle }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          
          {/* Education Section */}
          <div className="about-fade">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Education</h2>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Thapar Institute of Engineering and Technology, Patiala</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>B.E. Computer Engineering (Jul 2023 - Present)</p>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>CGPA: 8.82 / 10.00</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Manav Public School, Amritsar</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>2020 - 2023</p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Senior Secondary: 79.8%</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Matriculation: 93.2%</p>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="about-fade">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Achievements</h2>
            
            <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.6 }}>
              <li>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1.15rem', marginBottom: '0.4rem' }}>Meta PyTorch Hackathon Finalist</strong>
                Secured a highly competitive finalist position and earned mentorship from top developers in Bengaluru at India's biggest AI Hackathon co-hosted by Meta and HuggingFace, showcasing scalable Reinforcement Learning and AI environments.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1.15rem', marginBottom: '0.4rem' }}>Code for Purpose 2026 National Finalist</strong>
                Emerged in the Top 10 Nationwide from a massive competitor pool, earning official recognition for technical innovation and perseverance by successfully engineering and pitching Nexus Intelligence.
              </li>
              
            </ul>
          </div>

        </div>

        <GithubStats />
      </div>
    </section>
  );
};

export default About;
