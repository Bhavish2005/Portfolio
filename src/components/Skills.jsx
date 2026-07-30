import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Skills = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const skillsRow1 = ["C/C++", "CUDA", "Python", "Java", "JavaScript", "SQL", "C/C++", "CUDA", "GO", "Java", "Spring Boot ", "SQL"];
  const skillsRow2 = ["LangGraph", "Llama 3.1", "PostgreSQL", "React", "Docker", "AWS", "LangGraph", "Llama 3.1", "PostgreSQL", "React", "Docker", "AWS"];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 25,
          repeat: -1,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: '4rem 0' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--text-primary)' }}>Technical Arsenal</h2>
      </div>

      <div className="marquee-container" style={{ borderBottom: 'none' }}>
        <div className="marquee-content" ref={row1Ref}>
          {skillsRow1.map((skill, idx) => (
            <div key={idx} className={`marquee-item ${idx % 2 === 0 ? 'outline' : ''}`}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-container" style={{ borderTop: 'none', background: 'transparent' }}>
        <div className="marquee-content" ref={row2Ref}>
          {skillsRow2.map((skill, idx) => (
            <div key={idx} className={`marquee-item ${idx % 2 !== 0 ? 'outline' : ''}`}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
