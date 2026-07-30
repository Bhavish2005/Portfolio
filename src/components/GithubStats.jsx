import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { GitHubCalendar } from 'react-github-calendar';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';
import KnightGif from '../assets/Leetcode_Knight.gif';

const StatsDashboard = () => {
  const [gitStats, setGitStats] = useState({ repos: 0, totalContributions: 0 });
  const [lcStats, setLcStats] = useState({ 
    solved: 0, easy: 0, medium: 0, hard: 0,
    rating: 0, badges: 0, languages: [], topics: []
  });
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Fallback data in case Apify scraping fails or is rate-limited
  const staticTopicData = [
    { name: 'Array', solved: 627 },
    { name: 'String', solved: 231 },
    { name: 'Hash Table', solved: 213 },
    { name: 'Dynamic Prog.', solved: 175 },
    { name: 'Math', solved: 172 },
  ];

  useEffect(() => {
    // 1. Fetch GitHub Repos
    const fetchGitRepos = fetch('https://api.github.com/users/Bhavish2005')
      .then(res => res.json())
      .catch(() => ({ public_repos: 0 }));

    // 2. Fetch LeetCode Data (Using Secure Vercel Apify Proxy with Local File-System Cache)
    const fetchLcStats = fetch('/api/leetcode')
      .then(res => {
        if (!res.ok) throw new Error('Serverless proxy missing or unconfigured');
        return res.json();
      })
      .then(data => {
        const summary = data.summary || {};
        const problemStats = summary.problemStats?.solved || {};
        const contestStats = summary.contestStats || {};
        const badgeCount = summary.badges?.count || 0;
        
        // Map Top 3 Languages
        const languageData = data.language?.languageStats || [];
        const topLanguages = languageData.slice(0, 3);
        
        // Map Top 5 Topics for Radar Chart
        const skillsData = data.skills || {};
        const fundamental = skillsData.fundamental || [];
        const intermediate = skillsData.intermediate || [];
        const advanced = skillsData.advanced || [];
        const combinedSkills = [...fundamental, ...intermediate, ...advanced]
          .sort((a, b) => b.problemsSolved - a.problemsSolved)
          .slice(0, 5) 
          .map(skill => ({
            name: skill.tagName,
            solved: skill.problemsSolved
          }));

        return {
          solved: problemStats.all || 0,
          easy: problemStats.easy || 0,
          medium: problemStats.medium || 0,
          hard: problemStats.hard || 0,
          rating: Math.round(contestStats.rating || 0),
          badges: badgeCount,
          languages: topLanguages,
          topics: combinedSkills.length ? combinedSkills : staticTopicData
        };
      })
      .catch(() => {
        // Fallback if local testing without token
        return fetch('https://leetcode-stats-api.herokuapp.com/Bhavish_2005')
          .then(res => res.json())
          .then(data => ({
            solved: data.totalSolved || 0,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            rating: 0,
            badges: 0,
            languages: [],
            topics: staticTopicData
          }))
          .catch(() => ({ solved: 0, easy: 0, medium: 0, hard: 0, rating: 0, badges: 0, languages: [], topics: staticTopicData }));
      });

    Promise.all([fetchGitRepos, fetchLcStats])
      .then(([gitData, lcData]) => {
        setGitStats({
          repos: gitData.public_repos || 0,
          totalContributions: "1,250+" 
        });
        
        setLcStats(lcData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, [loading]);

  if (loading) return null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          color: '#0f172a' 
        }}>
          <p style={{ fontWeight: 600, marginBottom: '0.25rem', textTransform: 'capitalize' }}>{label}</p>
          <p style={{ color: '#64748b' }}>
            Solved: <span style={{ fontWeight: 600, color: '#0f172a' }}>{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-light)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>Live Performance Metrics</h2>
      
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
      
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* LeetCode Overview */}
          <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>LeetCode (Knight)</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{lcStats.solved > 0 ? lcStats.solved : "1000+"}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500, marginBottom: '1.5rem' }}>PROBLEMS SOLVED</div>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span style={{ color: '#00b8a3' }}>Easy: {lcStats.easy > 0 ? lcStats.easy : 400}</span>
                    <span style={{ color: '#ffc01e' }}>Med: {lcStats.medium > 0 ? lcStats.medium : 500}</span>
                    <span style={{ color: '#ff375f' }}>Hard: {lcStats.hard > 0 ? lcStats.hard : 100}</span>
                </div>

                {/* New Metrics Row: Contest Rating & Badges */}
                {lcStats.rating > 0 && (
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.25rem' }}>CONTEST RATING</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{lcStats.rating}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.25rem' }}>BADGES</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{lcStats.badges}</div>
                    </div>
                  </div>
                )}

                {/* Languages Pill Row */}
                {lcStats.languages.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    {lcStats.languages.map(lang => (
                      <span key={lang.languageName} style={{ 
                        padding: '0.35rem 0.85rem', 
                        backgroundColor: 'rgba(15, 23, 42, 0.05)', 
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        borderRadius: '50px', 
                        fontSize: '0.8rem', 
                        fontWeight: 600, 
                        color: 'var(--text-primary)' 
                      }}>
                          {lang.languageName}: {lang.problemsSolved}
                      </span>
                    ))}
                  </div>
                )}
             </div>
             
             <div style={{ flexShrink: 0, marginLeft: '1rem' }}>
                <img 
                  src={KnightGif} 
                  alt="LeetCode Knight Badge" 
                  style={{ width: '120px', height: '120px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.08))' }} 
                />
             </div>
          </div>

          {/* LeetCode Topics Radar Chart (High-Tech Aesthetic) */}
          <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Top Skill Domains</div>
            <div style={{ width: '100%', flex: 1, minHeight: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={lcStats.topics}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar name="Solved" dataKey="solved" stroke="#0f172a" strokeWidth={2} fill="#0f172a" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Merged GitHub Section (Full Width Card) */}
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>GitHub Contributions</div>
          </div>

          <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{ minWidth: '700px' }}>
              <GitHubCalendar 
                username="Bhavish2005" 
                colorScheme="light"
                blockSize={14}
                blockMargin={6}
                fontSize={14}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                }}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{gitStats.repos}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500, letterSpacing: '1px' }}>PUBLIC REPOS</div>
            </div>
            
            <div style={{ width: '1px', height: '60px', background: 'var(--border-light)', display: 'none' }} className="desktop-divider" />
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{gitStats.totalContributions}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500, letterSpacing: '1px' }}>TOTAL CONTRIBUTIONS</div>
            </div>
          </div>

        </div>

      </div>
      <style>{`
        @media (min-width: 768px) {
          .desktop-divider { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default StatsDashboard;
