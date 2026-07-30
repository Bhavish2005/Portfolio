import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Briefcase, X, ArrowUp, Trash2, ArrowRight } from 'lucide-react';
import { candidateProfile, analyzeJDSuitability } from '../data/portfolioContext';
import leoIcon from '../assets/leo (1).png';

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  // Chat message state
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello. I am Leo, Bhavish's AI Portfolio.\n\nYou can ask about his technical architecture skills, engineering background, collaboration approach, or paste a Job Description (JD) to evaluate technical compatibility.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // JD Analyzer state
  const [jdText, setJdText] = useState('');
  const [jdResult, setJdResult] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  // Handle Q&A RAG Engine Response
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsThinking(true);

    // AI Response Logic (Groq API + Local RAG Engine Fallback)
    setTimeout(async () => {
      let botResponse = "";

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (apiKey) {
        try {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [
                {
                  role: 'system',
                  content: `You are Leo, Bhavish Pushkarna's AI Assistant.
Candidate Info:
- Name: ${candidateProfile.name}
- Role: ${candidateProfile.role}
- Persona Traits: ${candidateProfile.persona.traits.join(', ')}
- Persona Style: ${candidateProfile.persona.communicationStyle}
- Core Skills: ${JSON.stringify(candidateProfile.skills)}
- Key Projects: ${JSON.stringify(candidateProfile.projects.map(p => ({ title: p.title, tech: p.tech, highlights: p.keyHighlights })))}
- HR Q&A Context: ${JSON.stringify(candidateProfile.persona.behavioralAnswers)}

Guidelines:
1. Maintain a clean, professional, grounded, collaborative, and approachable tone. Absolutely no emojis.
2. Be precise about Bhavish's technical capabilities in Python, C++, Java, Spring Boot, React, Groq GenAI, ChromaDB, Redis, and CUDA C++.
3. If asked about deadlines, pressure, or teamwork, emphasize his commitment to milestones, clear communication, generosity with code reviews, and zero-ego learning.`
                },
                { role: 'user', content: query }
              ],
              temperature: 0.7,
              max_tokens: 400
            })
          });

          if (res.ok) {
            const data = await res.json();
            botResponse = data.choices[0].message.content;
          }
        } catch (err) {
          console.warn("Groq API fallback to local RAG engine:", err);
        }
      }

      // High-precision Local RAG Engine Fallback
      if (!botResponse) {
        botResponse = generateLocalRAGResponse(query);
      }

      // Strip any accidental emojis
      botResponse = botResponse.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

      const botMsg = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 500);
  };

  // Local RAG Context Matcher
  const generateLocalRAGResponse = (query) => {
    const qLower = query.toLowerCase();

    if (qLower.includes('jd') || qLower.includes('job description') || qLower.includes('suit') || qLower.includes('fit') || qLower.includes('hire')) {
      return `To evaluate a specific position, switch to the JD Analyzer tab at the top of this panel, paste your Job Description text, and click Evaluate Alignment.`;
    }

    if (qLower.includes('deadline') || qLower.includes('pressure') || qLower.includes('stress')) {
      return candidateProfile.persona.behavioralAnswers[0].answer;
    }

    if (qLower.includes('team') || qLower.includes('collaborat') || qLower.includes('review') || qLower.includes('disagree')) {
      return candidateProfile.persona.behavioralAnswers[1].answer + " " + candidateProfile.persona.behavioralAnswers[2].answer;
    }

    if (qLower.includes('work ethic') || qLower.includes('personality') || qLower.includes('vibe') || qLower.includes('culture')) {
      return candidateProfile.persona.behavioralAnswers[3].answer;
    }

    if (qLower.includes('learn') || qLower.includes('evolv') || qLower.includes('up to date')) {
      return candidateProfile.persona.behavioralAnswers[4].answer;
    }

    if (qLower.includes('nexus') || qLower.includes('rag') || qLower.includes('ai pipeline')) {
      const p = candidateProfile.projects[0];
      return `${p.title} (${p.subtitle}): ${p.keyHighlights}\n\nTechnologies: ${p.tech.join(', ')}.`;
    }

    if (qLower.includes('cuda') || qLower.includes('ray tracer') || qLower.includes('gpu') || qLower.includes('c++')) {
      const p = candidateProfile.projects[1];
      return `${p.title} (${p.subtitle}): ${p.keyHighlights}\n\nTechnologies: ${p.tech.join(', ')}.`;
    }

    if (qLower.includes('finance') || qLower.includes('spring boot') || qLower.includes('java')) {
      const p = candidateProfile.projects[2];
      return `${p.title} (${p.subtitle}): ${p.keyHighlights}\n\nTechnologies: ${p.tech.join(', ')}.`;
    }

    if (qLower.includes('fixmate') || qLower.includes('webrtc') || qLower.includes('editor')) {
      const p = candidateProfile.projects[3];
      return `${p.title} (${p.subtitle}): ${p.keyHighlights}\n\nTechnologies: ${p.tech.join(', ')}.`;
    }

    return `Bhavish is a Computer Science undergraduate specializing in Full-Stack AI Systems (LangGraph, Spring Boot, React, Redis) and High-Performance Computing (CUDA C++, OpenGL). He maintains a collaborative, deadline-driven workflow and open technical communication. Which area of his experience would you like to explore?`;
  };

  // Run JD Analysis
  const handleAnalyzeJD = () => {
    if (!jdText.trim()) return;
    const result = analyzeJDSuitability(jdText);
    setJdResult(result);
  };

  return (
    <>
      {/* Embedded CSS for Custom Transparent Scrollbar */}
      <style>{`
        .custom-transparent-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.12) transparent;
          overscroll-behavior: contain;
          overscroll-behavior-y: contain;
        }
        .custom-transparent-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 4px;
        }
        .custom-transparent-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-transparent-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.12);
          border-radius: 10px;
        }
        .custom-transparent-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Floating Trigger Pill Opener with Sparkles icon in front of LEO */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9990,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.85rem 1.6rem',
            borderRadius: '50px',
            background: 'var(--text-primary)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.92rem',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <img src={leoIcon} alt="Leo" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', display: 'block', flexShrink: 0, margin: 0 }} />
          <span>LEO </span>
        </button>
      )}

      {/* Assistant Drawer Panel */}
      {isOpen && (
        <div
          onWheel={(e) => {
            e.stopPropagation();
          }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '90vw',
            maxWidth: '440px',
            height: '620px',
            maxHeight: '82vh',
            borderRadius: '24px',
            background: 'var(--surface)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.14)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overscrollBehavior: 'contain',
            overscrollBehaviorY: 'contain',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-primary)',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '1rem',
              flexShrink: 0,
            }}
          >
            <div style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden' }}>
              <h4 
                style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 700, 
                  margin: 0, 
                  color: 'var(--text-primary)', 
                  letterSpacing: '-0.01em', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}
              >
                LEO
              </h4>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace', display: 'block', marginTop: '0.1rem' }}>
                ASK ANYTHING FROM VIRTUAL VERSION OF MINE
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexShrink: 0 }}>
              <button
                onClick={() => setMessages([messages[0]])}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                title="Clear Conversation"
              >
                <Trash2 size={15} style={{ display: 'block', margin: 0 }} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  padding: 0,
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                title="Close Drawer"
              >
                <X size={18} style={{ display: 'block', margin: 0 }} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-light)',
              background: 'var(--surface)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                background: activeTab === 'chat' ? 'var(--surface)' : 'var(--bg-primary)',
                color: activeTab === 'chat' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'chat' ? 700 : 500,
                fontSize: '0.86rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'chat' ? '2px solid var(--text-primary)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '0.5rem',
              }}
            >
              <MessageSquare size={14} style={{ display: 'block', margin: 0 }} /> Candidate Inquiry
            </button>
            <button
              onClick={() => setActiveTab('jd')}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                background: activeTab === 'jd' ? 'var(--surface)' : 'var(--bg-primary)',
                color: activeTab === 'jd' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'jd' ? 700 : 500,
                fontSize: '0.86rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'jd' ? '2px solid var(--text-primary)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '0.5rem',
              }}
            >
              <Briefcase size={14} style={{ display: 'block', margin: 0 }} /> JD Analyzer
            </button>
          </div>

          {/* Tab Content: Q&A Chat */}
          {activeTab === 'chat' && (
            <div style={{ flex: '1 1 0%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {/* Messages Scroll Area with Custom Transparent Scrollbar */}
              <div 
                className="custom-transparent-scrollbar"
                style={{ 
                  flex: '1 1 0%', 
                  minHeight: 0, 
                  padding: '1.25rem', 
                  overflowY: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  overscrollBehavior: 'contain',
                  overscrollBehaviorY: 'contain',
                }}
                onWheel={(e) => {
                  const element = e.currentTarget;
                  const { scrollTop, scrollHeight, clientHeight } = element;
                  const isScrollable = scrollHeight > clientHeight;
                  if (!isScrollable) {
                    e.preventDefault();
                    return;
                  }
                  if (e.deltaY < 0 && scrollTop <= 0) {
                    e.preventDefault();
                  } else if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
                    e.preventDefault();
                  }
                }}
              >
                
                {/* Recommended Prompts Horizontal Sliding Pills */}
                <div 
                  className="custom-transparent-scrollbar"
                  style={{ 
                    display: 'flex', 
                    flexWrap: 'nowrap', 
                    gap: '0.45rem', 
                    overflowX: 'auto', 
                    overflowY: 'hidden',
                    paddingBottom: '0.4rem',
                    marginBottom: '0.25rem',
                    touchAction: 'pan-x',
                    overscrollBehaviorX: 'contain',
                    flexShrink: 0
                  }}
                  onWheel={(e) => {
                    if (e.deltaX !== 0) {
                      e.stopPropagation();
                    } else if (Math.abs(e.deltaY) > 0) {
                      e.currentTarget.scrollLeft += e.deltaY;
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  {[
                    "What is Bhavish's work ethic?",
                    "How does he handle tight deadlines?",
                    "Explain Nexus Intelligence",
                    "What are his CUDA & C++ skills?"
                  ].map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(promptText)}
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 500,
                        padding: '0.4rem 0.85rem',
                        borderRadius: '50px',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-light)')}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.85rem 1.1rem',
                        borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        background: msg.sender === 'user' ? 'var(--text-primary)' : 'var(--bg-primary)',
                        color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                        fontSize: '0.88rem',
                        lineHeight: 1.55,
                        border: msg.sender === 'bot' ? '1px solid var(--border-light)' : 'none',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isThinking && (
                  <div style={{ alignSelf: 'flex-start', padding: '0.6rem 1rem', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    Analyzing candidate context...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Field */}
              <div style={{ padding: '1rem', borderTop: '1px solid var(--border-light)', background: 'var(--surface)', flexShrink: 0 }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  <input
                    type="text"
                    placeholder="Ask about technical skills, work style, or projects..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1.1rem',
                      borderRadius: '50px',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                  {/* Symmetrical Vertical Arrow Send Button */}
                  <button
                    type="submit"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--text-primary)',
                      color: '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      padding: 0,
                      flexShrink: 0,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <ArrowUp size={18} style={{ display: 'block', margin: '0 auto' }} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab Content: Instant JD Analyzer */}
          {activeTab === 'jd' && (
            <div className="custom-transparent-scrollbar" style={{ flex: '1 1 0%', minHeight: 0, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Job Description Compatibility Evaluation
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Paste a Job Description (JD) below to generate a compatibility evaluation against Bhavish's technical background, skill set, and codebase achievements.
                </p>
              </div>

              <textarea
                rows={5}
                placeholder="Paste Job Description text here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />

              <button
                onClick={handleAnalyzeJD}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem',
                  borderRadius: '50px',
                  background: 'var(--text-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Evaluate Alignment <ArrowRight size={15} style={{ display: 'block', margin: 0 }} />
              </button>

              {/* Analysis Result Output Card */}
              {jdResult && (
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '16px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  {/* Score Meter */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      CALCULATED MATCH
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.8rem',
                        borderRadius: '50px',
                        background: 'var(--text-primary)',
                        color: '#ffffff',
                      }}
                    >
                      {jdResult.matchScore}%
                    </span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                    {jdResult.summary}
                  </p>

                  {/* Matched Competencies */}
                  {jdResult.matchedSkills.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                        MATCHED COMPETENCIES:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {jdResult.matchedSkills.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              padding: '0.25rem 0.6rem',
                              borderRadius: '50px',
                              background: 'var(--surface)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-light)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Relevant Project Recommendations */}
                  {jdResult.relevantProjects.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', fontFamily: 'monospace' }}>
                        RELEVANT PROJECT PROOF:
                      </span>
                      {jdResult.relevantProjects.slice(0, 2).map((p, i) => (
                        <div key={i} style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          • {p.title} ({p.subtitle})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
