import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for the entire section
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request for the premium feel
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Native mailto fallback since there's no backend configured yet.
      // You can easily replace this with Formspree or Web3Forms by changing the <form action="...">
      const mailtoLink = `mailto:bhavish2005@example.com?subject=Portfolio Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
      window.location.href = mailtoLink;
      
      // Reset form after a few seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--border-light)',
    backgroundColor: '#ffffff',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    marginBottom: '1.5rem',
    fontFamily: 'inherit'
  };

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Let's Connect</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '1rem' }}>
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 250px' }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle} 
                  placeholder="John Doe"
                  onFocus={(e) => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div style={{ flex: '1 1 250px' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle} 
                  placeholder="john@example.com"
                  onFocus={(e) => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="What's on your mind?"
                onFocus={(e) => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || submitted}
              style={{
                marginTop: '1rem',
                padding: '1.2rem 2.5rem',
                backgroundColor: submitted ? '#00b8a3' : 'var(--text-primary)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '0.5rem',
                cursor: (isSubmitting || submitted) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => { if(!isSubmitting && !submitted) e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { if(!isSubmitting && !submitted) e.target.style.transform = 'translateY(0)'; }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : submitted ? (
                'Message Sent!'
              ) : (
                <>Send Message <FiSend size={18} /></>
              )}
            </button>
          </form>
        </div>
        
        {/* Contact Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '4rem', flexWrap: 'wrap' }}>
          <a href="https://github.com/Bhavish2005" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='var(--text-primary)'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>
            <FiGithub size={20} /> GitHub
          </a>
          <a href="https://leetcode.com/u/Bhavish_2005/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='#000000'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>
            <SiLeetcode size={20} style={{ color: 'var(--text-primary)' }} /> LeetCode
          </a>
          <a href="https://linkedin.com/in/bhavish-pushkarna-52715429a" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='var(--text-primary)'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>
            <FiLinkedin size={20} /> LinkedIn
          </a>
          <a href="mailto:bhavish.pushkarna@example.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color='var(--text-primary)'} onMouseLeave={(e)=>e.target.style.color='var(--text-secondary)'}>
            <FiMail size={20} /> Email
          </a>
        </div>
      </div>
      
      {/* Required for the loading spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
