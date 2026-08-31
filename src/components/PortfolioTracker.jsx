import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronUp, Check, Eye, Circle, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

export default function PortfolioTracker() {
  const navigate = useNavigate();
  const location = useLocation();

  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem('portfolioTrackerState');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const trackerRef = useRef(null);
  const pulseRef = useRef(null);

  const allTasks = [
    { id: 'about', label: 'Read About Section', type: 'scroll' },
    { id: 'skills', label: 'Check out Skills', type: 'scroll' },
    { id: 'projects', label: 'View Projects List', type: 'scroll' },
    { id: 'project_1', label: 'Explore Nexus Intelligence', type: 'interaction' },
    { id: 'project_2', label: 'Explore Ray Tracer', type: 'interaction' },
    { id: 'project_3', label: 'Explore FinanceVUE', type: 'interaction' },
    { id: 'project_4', label: 'Explore FixMate', type: 'interaction' },
    { id: 'resumes', label: 'See Resumes', type: 'scroll' },
    { id: 'resume_link', label: 'Open a Resume', type: 'interaction' },
    { id: 'contact', label: 'Reach Contact Section', type: 'scroll' },
    { id: 'leo', label: 'Interact with LEO', type: 'interaction' },
  ];

  const triggerCompletionEffect = () => {
    // Only fire effect if we are on the Home page
    if (location.pathname !== '/') return;

    const confettiCount = 80;
    const colors = ['#000000', '#333333', '#666666', '#ffffff'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = `${Math.random() * 8 + 4}px`;
      confetti.style.height = `${Math.random() * 8 + 4}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = '50%';
      confetti.style.bottom = '0px';
      confetti.style.zIndex = '99999';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI + Math.PI; 
      const velocity = Math.random() * 15 + 15;
      const tx = Math.cos(angle) * velocity * 20;
      const ty = Math.sin(angle) * velocity * 20;

      gsap.to(confetti, {
        x: tx,
        y: ty + 200, 
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        duration: Math.random() * 1.5 + 1,
        ease: 'power2.out',
        onComplete: () => {
          confetti.remove();
        }
      });
    }
  };

  const markComplete = (taskId) => {
    setCompletedItems(prev => {
      if (prev.has(taskId)) return prev;
      const newSet = new Set(prev);
      newSet.add(taskId);
      localStorage.setItem('portfolioTrackerState', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const pathnameRef = useRef(location.pathname);
  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (pathnameRef.current !== '/') return;
      const windowHeight = window.innerHeight;
      allTasks.filter(t => t.type === 'scroll').forEach(task => {
        const el = document.getElementById(task.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
            markComplete(task.id);
          }
        }
      });
    };

    const handleLeoInteract = () => markComplete('leo');
    const handleResumeClick = () => markComplete('resume_link');
    const handleViewProject = (e) => markComplete('project_' + e.detail.projectId);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('portfolio:interactLeo', handleLeoInteract);
    window.addEventListener('portfolio:clickResume', handleResumeClick);
    window.addEventListener('portfolio:viewProject', handleViewProject);
    
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('portfolio:interactLeo', handleLeoInteract);
      window.removeEventListener('portfolio:clickResume', handleResumeClick);
      window.removeEventListener('portfolio:viewProject', handleViewProject);
    };
  }, []); // Run once on mount to prevent race conditions during navigation

  useEffect(() => {
    if (pathnameRef.current !== '/') return;

    if (completedItems.size === allTasks.length && !isCompleted) {
      const hasFired = localStorage.getItem('portfolioConfettiFired');
      setIsCompleted(true);
      if (!hasFired) {
        triggerCompletionEffect();
        localStorage.setItem('portfolioConfettiFired', 'true');
      }
    }
  }, [completedItems, isCompleted, location.pathname]);

  const percentage = Math.round((completedItems.size / allTasks.length) * 100);
  
  // Pulse animation for unfinished tasks
  useEffect(() => {
    if (percentage < 100 && !isExpanded && !isCompleted) {
      gsap.to(pulseRef.current, {
        scale: 1.25,
        opacity: 0.8,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: 'sine.inOut'
      });
    } else {
      gsap.killTweensOf(pulseRef.current);
      gsap.to(pulseRef.current, { scale: 1, opacity: 0, duration: 0.3 });
    }
  }, [percentage, isExpanded, isCompleted]);

  const handleTaskClick = (task) => {
    setIsExpanded(false);
    
    if (task.id.startsWith('project_')) {
      const pid = task.id.split('_')[1];
      navigate(`/project/${pid}`);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => executeHomeAction(task), 500);
    } else {
      executeHomeAction(task);
    }
  };

  const executeHomeAction = (task) => {
    if (task.type === 'scroll') {
      gsap.to(window, { duration: 1.2, scrollTo: { y: `#${task.id}`, offsetY: 80 }, ease: "power3.inOut" });
    } else if (task.id === 'leo') {
      const leoBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('LEO'));
      if (leoBtn) leoBtn.click();
    } else if (task.id === 'resume_link') {
      gsap.to(window, { duration: 1.2, scrollTo: { y: `#resumes`, offsetY: 80 }, ease: "power3.inOut" });
    }
  };

  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Render timeline logic
  // Find the first uncompleted task to highlight it as "Next"
  const firstUncompletedIndex = allTasks.findIndex(t => !completedItems.has(t.id));

  // If we are not on Home page, only render tracker if we want it global
  // The user wants the effect when coming BACK to Home, meaning tracker is global or just rendered on Home.
  // Actually, rendering it globally is better so they see their progress on the project page too.
  
  return (
    <div
      ref={trackerRef}
      style={{
        position: 'fixed',
        bottom: 'clamp(1rem, 5vw, 2rem)',
        left: 'clamp(1rem, 5vw, 2rem)',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.8rem',
      }}
    >
      {isExpanded && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '24px',
            padding: '1.5rem',
            width: '280px',
            maxHeight: '60vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            transformOrigin: 'bottom left',
            animation: 'trackerPopup 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          className="custom-transparent-scrollbar"
        >
          <style>{`
            @keyframes trackerPopup {
              from { opacity: 0; transform: scale(0.9) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .custom-transparent-scrollbar::-webkit-scrollbar { display: none; }
            .custom-transparent-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Eye size={20} color="var(--text-primary)" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Journey Tracker
            </h4>
          </div>
          
          <div style={{ position: 'relative', paddingLeft: '1rem' }}>
            {/* Vertical timeline line */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              bottom: '10px', 
              left: '11px', 
              width: '2px', 
              background: 'rgba(0,0,0,0.08)',
              zIndex: 0
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
              {allTasks.map((task, index) => {
                const isCompletedTask = completedItems.has(task.id);
                const isNext = index === firstUncompletedIndex;
                
                return (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Timeline Node */}
                    <div style={{ 
                      marginTop: '2px',
                      background: 'var(--surface)',
                      borderRadius: '50%',
                      padding: '2px'
                    }}>
                      {isCompletedTask ? (
                        <CheckCircle2 size={18} color="var(--text-primary)" fill="rgba(0,0,0,0.05)" />
                      ) : isNext ? (
                        <Circle size={18} color="var(--text-primary)" strokeWidth={3} />
                      ) : (
                        <Circle size={18} color="rgba(0,0,0,0.2)" />
                      )}
                    </div>
                    
                    {/* Task Content */}
                    <div 
                      onClick={() => !isCompletedTask && handleTaskClick(task)}
                      style={{ 
                        flex: 1, 
                        cursor: isCompletedTask ? 'default' : 'pointer',
                        opacity: isCompletedTask ? 0.5 : 1,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <div style={{ 
                        fontSize: '0.88rem', 
                        fontWeight: isNext ? 700 : 500, 
                        color: 'var(--text-primary)',
                        textDecoration: isCompletedTask ? 'line-through' : 'none',
                        marginBottom: '0.2rem'
                      }}>
                        {task.label}
                      </div>
                      {isNext && (
                        <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>
                          Suggested Next Step →
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {percentage === 100 && (
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Portfolio Completed!
              </h4>
            </div>
          )}
        </div>
      )}

      {/* Main Tracker Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          position: 'relative',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div
          ref={pulseRef}
          style={{
            position: 'absolute',
            top: '0', left: '0', right: '0', bottom: '0',
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.2)',
            pointerEvents: 'none',
            opacity: 0,
          }}
        />

        <svg width="56" height="56" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
          <circle 
            cx="28" cy="28" r="22" 
            fill="none" stroke="var(--text-primary)" strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          color: 'var(--text-primary)',
          position: 'relative',
          zIndex: 1
        }}>
          {percentage === 100 ? <Check size={16} strokeWidth={3} /> : `${percentage}%`}
        </span>
      </button>
    </div>
  );
}
