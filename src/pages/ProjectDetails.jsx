import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Star, ExternalLink, Code2, AlertTriangle, Layers } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { projectsData } from '../data/projects';
import SpiralImageStack from '../components/SpiralImageStack';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));

  const [readmeContent, setReadmeContent] = useState('');
  const [loadingReadme, setLoadingReadme] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); 
    
    if (project && project.githubLink) {
      setLoadingReadme(true);
      const baseUrl = project.githubLink.replace('github.com', 'raw.githubusercontent.com');
      
      fetch(`${baseUrl}/main/README.md`)
        .then(res => {
          if (!res.ok) throw new Error('Not found on main branch');
          return res.text();
        })
        .catch(() => fetch(`${baseUrl}/master/README.md`).then(res => res.text()))
        .then(text => {
          setReadmeContent(text);
          setLoadingReadme(false);
        })
        .catch(() => {
          setReadmeContent('_README could not be loaded or does not exist._');
          setLoadingReadme(false);
        });
    }
  }, [project]);

  if (!project) return <div style={{ paddingTop: '150px', textAlign: 'center', fontSize: '2rem' }}>Project not found</div>;

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', paddingBottom: '6rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
      
      {/* Header Section */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 600, fontSize: '1.1rem' }}>
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
        
        <h1 style={{ fontSize: '4.5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {project.title}
        </h1>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: 400 }}>
          {project.subtitle}
        </h2>

        {/* Live Links Section - Prominent Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'var(--text-primary)', color: '#fff', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e)=>{e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'}} onMouseLeave={(e)=>{e.target.style.transform='translateY(0)'; e.target.style.boxShadow='0 4px 15px rgba(0,0,0,0.1)'}}>
              <ExternalLink size={20} /> View Live Website
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', border: '1px solid var(--border-light)', background: 'var(--surface)', color: 'var(--text-primary)', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', transition: 'background 0.2s ease' }} onMouseEnter={(e)=>e.target.style.background='var(--bg-primary)'} onMouseLeave={(e)=>e.target.style.background='var(--surface)'}>
              <FiGithub size={20} /> GitHub Source
            </a>
          )}
        </div>

        {/* Spiral Stacked Preview Cards (Unified Main & Sub-Cards) */}
        <div style={{ width: '100%', marginBottom: '4rem', padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <SpiralImageStack 
              coverImage={project.coverImage} 
              gallery={project.gallery} 
              title={project.title} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', flexWrap: 'wrap' }}>
          {project.tools.map(tool => (
            <span key={tool} style={{ padding: '0.6rem 1.2rem', background: 'var(--border-light)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto', marginBottom: '4rem' }}>
        
        {/* The Problem / Need */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle color="var(--text-primary)" size={28} /> The Need
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.15rem' }}>
            {project.problemStatement || "Problem statement coming soon..."}
          </p>
        </div>

        {/* Architecture Deep Dive */}
        {project.architectureDeepDive && (
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Layers color="var(--text-primary)" size={28} /> Architecture Deep Dive
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.15rem' }}>
              {project.architectureDeepDive}
            </p>
          </div>
        )}

        {/* Challenges Overcome */}
        {project.challengesOvercome && (
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code2 color="var(--text-primary)" size={28} /> Challenges Overcome
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.15rem' }}>
              {project.challengesOvercome}
            </p>
          </div>
        )}
        
        {/* Features */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 color="#000000" /> Key Features
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.features?.map((feature, i) => (
              <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Highlights */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star color="rgb(6, 6, 6)" /> Technical Highlights
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.highlights?.map((highlight, i) => (
              <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full GitHub README Integration */}
      {project.githubLink && (
        <div style={{ maxWidth: '1000px', margin: '6rem auto', padding: '4rem', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '3rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiGithub size={28} /> Live GitHub README
          </h3>
          
          {loadingReadme ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--text-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem auto' }} />
              Fetching live documentation from GitHub...
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {readmeContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
      
      {/* Markdown Styles */}
      <style>{`
        .markdown-body {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          font-weight: 700;
        }
        .markdown-body h1 { font-size: 2.5rem; }
        .markdown-body h2 { font-size: 1.8rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem; }
        .markdown-body h3 { font-size: 1.4rem; }
        .markdown-body a { color: #3b82f6; text-decoration: none; font-weight: 500; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body pre { background: var(--bg-primary); padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; border: 1px solid var(--border-light); margin: 1.5rem 0; }
        .markdown-body code { background: var(--bg-primary); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.9em; border: 1px solid var(--border-light); color: var(--text-primary); }
        .markdown-body pre code { background: transparent; padding: 0; border: none; color: inherit; }
        .markdown-body img { max-width: 100%; border-radius: 0.5rem; margin: 1.5rem 0; border: 1px solid var(--border-light); }
        .markdown-body ul, .markdown-body ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-body li { margin-bottom: 0.5rem; }
        .markdown-body table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .markdown-body th, .markdown-body td { border: 1px solid var(--border-light); padding: 0.75rem; text-align: left; }
        .markdown-body th { background: var(--bg-primary); font-weight: 600; }
        .markdown-body blockquote { border-left: 4px solid var(--text-primary); margin: 1.5rem 0; padding-left: 1.5rem; color: var(--text-muted); font-style: italic; background: var(--bg-primary); padding: 1rem 1rem 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
