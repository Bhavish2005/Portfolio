// Complete Knowledge Base for RAG AI Portfolio Assistant & JD Compatibility Engine

export const candidateProfile = {
  name: "Bhavish Pushkarna",
  role: "Computer Science Undergraduate | Full Stack & AI Systems Engineer | HPC Developer",
  email: "bhavishpushkarna@gmail.com",
  github: "https://github.com/Bhavish2005",
  leetcode: "https://leetcode.com/u/Bhavish_2005/",
  resumes: [
    {
      id: 1,
      title: "AI & Full-Stack Systems Resume",
      subtitle: "Generative AI, LangGraph, Spring Boot, React, ChromaDB & Redis",
      focus: "AI Engineering, Full-Stack Development, and Intelligent Backend Architecture",
      description: "Highlights expertise in multi-agent LLM orchestration (LangGraph, Groq), semantic vector caching, Spring Boot REST APIs, microservices, and modern React architectures.",
      link: "https://drive.google.com/file/d/1epu2dPL4Y8ELawRnmNu8fmCvMWC-eadW/view?usp=sharing",
      tags: ["GenAI", "LangGraph", "Spring Boot", "React", "ChromaDB", "PostgreSQL"],
    },
    {
      id: 2,
      title: "High-Performance Computing & Systems Resume",
      subtitle: "CUDA C++, GPU Acceleration, Parallel Computing, OpenGL & BVH Traversal",
      focus: "Core Systems Engineering, High-Performance Computing (HPC), GPU Software & Graphics Programming",
      description: "Focuses on low-level memory optimization, CUDA parallelism, BVH spatial partitioning algorithms, multi-threaded performance engineering, and C++ system design.",
      link: "https://drive.google.com/file/d/1lYBD7y3B6TL3GSYlk2bNBvVrA4kUfyr5/view?usp=sharing",
      tags: ["C++", "CUDA", "OpenGL", "Parallel Computing", "BVH", "HPC"],
    }
  ],

  // Personality & HR Behavioral Trait Matrix
  persona: {
    traits: ["Generous", "Collaborative", "Deadline-Driven", "Humorous & Approachable", "Humble & Growth-Minded"],
    communicationStyle: "Warm, professional, grounded, empathetic, witty, and solution-focused with zero ego.",
    
    // Core HR Q&A Knowledge Base
    behavioralAnswers: [
      {
        question: "How do you handle tight deadlines and high pressure?",
        answer: "I view deadlines as a forcing function for clarity. I break down complex deliverables into prioritized milestones, keep transparent communication with the team, and focus on delivering robust core functionality first. Keeping a calm, approachable atmosphere helps the team stay focused and productive."
      },
      {
        question: "What is your approach to team collaboration and code reviews?",
        answer: "Great software is built by great teams, not isolated individuals. In code reviews, I am generous with encouragement and constructive with feedback. I approach every PR with curiosity—viewing it as a mutual learning opportunity rather than a battle of egos."
      },
      {
        question: "How do you handle technical disagreements or mistakes?",
        answer: "I leave my ego at the door. If a teammate suggests a superior architectural approach, I gladly adopt it. If I make an error, I acknowledge it immediately, diagnose the root cause, document the resolution so the team benefits, and keep moving forward."
      },
      {
        question: "What is your work ethic and attitude in a team environment?",
        answer: "I combine deep technical dedication with an approachable, lighthearted attitude. A healthy, friendly environment makes complex engineering problems significantly easier to solve."
      },
      {
        question: "How do you stay updated with rapidly evolving technology?",
        answer: "By building hands-on systems. Building projects like Nexus Intelligence (LangGraph RAG) and CUDA Ray Tracers forces me to study papers, source code, and performance bottlenecks directly."
      }
    ]
  },

  // Technical Competency Matrix for JD Matching
  skills: {
    languages: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL", "CUDA C"],
    frameworks: ["React", "Spring Boot", "Node.js", "Express", "LangGraph", "OpenGL", "TailwindCSS"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "ChromaDB"],
    ai_ml: ["GenAI", "LangGraph", "ChromaDB Embeddings", "Groq API", "Llama 3.1", "Gemini Flash", "RAG Pipelines"],
    tools_hpc: ["CUDA", "Git", "Docker", "Piston API", "Socket.io", "BVH Algorithms", "JWT", "Bucket4j"]
  },

  // Projects Breakdown for RAG Context
  projects: [
    {
      title: "Nexus Intelligence",
      subtitle: "Autonomous AI Data Pipeline",
      tech: ["Python", "LangGraph", "Groq API", "Llama 3.1", "PostgreSQL", "ChromaDB", "Redis"],
      keyHighlights: "6-layer AI semantic query pipeline with Redis/ChromaDB vector caching to eliminate redundant LLM calls and multi-agent SQL validation sandbox.",
      relevance: "AI Engineering, RAG Architectures, LLM Systems, Backend Optimization"
    },
    {
      title: "High-Performance Ray Tracer",
      subtitle: "CUDA C++ Engine",
      tech: ["C++", "CUDA", "OpenGL", "Parallel Computing", "BVH"],
      keyHighlights: "Real-time CUDA GPU-accelerated 3D ray tracing engine with BVH spatial partitioning achieving 98% GPU SM utilization.",
      relevance: "Systems Engineering, HPC, Graphics Programming, C++ Memory Optimization"
    },
    {
      title: "FinanceVUE",
      subtitle: "Intelligent Real-Time Platform",
      tech: ["Java", "Spring Boot", "PostgreSQL", "React", "Redis", "Gemini AI", "JWT"],
      keyHighlights: "Multimodal Gemini AI receipt scanner, Spring Boot REST backend with Redis rate limiting and automated email notification queue.",
      relevance: "Full-Stack Development, Spring Boot Microservices, Cloud Financial Apps"
    },
    {
      title: "FixMate",
      subtitle: "AI Pair-Programming Platform",
      tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Stream WebRTC"],
      keyHighlights: "Real-time collaborative code editor with Socket.io Operational Transformation (OT), WebRTC video chat, and Gemini AI debug buddy.",
      relevance: "Real-Time Systems, WebRTC, Pair Programming Tools, Node.js"
    }
  ]
};

// JD Matching Heuristic Analyzer
export function analyzeJDSuitability(jdText) {
  if (!jdText || jdText.trim().length < 20) {
    return {
      matchScore: 0,
      summary: "Please provide a more detailed Job Description for an accurate analysis.",
      matchedSkills: [],
      missingSkills: [],
      relevantProjects: []
    };
  }

  const jdLower = jdText.toLowerCase();
  
  // Skill match extraction
  const allSkills = [
    ...candidateProfile.skills.languages,
    ...candidateProfile.skills.frameworks,
    ...candidateProfile.skills.databases,
    ...candidateProfile.skills.ai_ml,
    ...candidateProfile.skills.tools_hpc
  ];

  const matchedSkills = [];

  allSkills.forEach(skill => {
    if (jdLower.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    }
  });

  // Check key domains
  const isAI = jdLower.includes('ai') || jdLower.includes('llm') || jdLower.includes('rag') || jdLower.includes('python') || jdLower.includes('langchain') || jdLower.includes('langgraph');
  const isSystems = jdLower.includes('c++') || jdLower.includes('cuda') || jdLower.includes('gpu') || jdLower.includes('parallel') || jdLower.includes('hpc') || jdLower.includes('performance');
  const isWeb = jdLower.includes('react') || jdLower.includes('full stack') || jdLower.includes('fullstack') || jdLower.includes('spring boot') || jdLower.includes('java') || jdLower.includes('node');

  // Find relevant projects
  const relevantProjects = candidateProfile.projects.filter(p => {
    return p.tech.some(t => jdLower.includes(t.toLowerCase())) ||
      (isAI && p.title.includes('Nexus')) ||
      (isSystems && p.title.includes('Ray Tracer')) ||
      (isWeb && (p.title.includes('FinanceVUE') || p.title.includes('FixMate')));
  });

  // Calculate score heuristic
  let score = 50;
  if (matchedSkills.length > 0) score += Math.min(matchedSkills.length * 7, 35);
  if (isAI || isSystems || isWeb) score += 15;
  score = Math.min(Math.max(score, 65), 98);

  let summary = "";
  if (score >= 85) {
    summary = `High Compatibility Match (${score}%). Bhavish's technical background in ${matchedSkills.slice(0, 4).join(', ') || 'modern software engineering'} aligns strongly with this position. His experience building production RAG pipelines, Spring Boot services, and high-speed CUDA C++ algorithms makes him a strong fit.`;
  } else if (score >= 70) {
    summary = `Strong Technical Alignment (${score}%). Bhavish meets core requirements with hands-on project implementations in ${matchedSkills.slice(0, 3).join(', ') || 'full-stack engineering'}. He ramps up quickly on new domain tools and maintains a disciplined, collaborative workflow.`;
  } else {
    summary = `Transferable Core Alignment (${score}%). Bhavish's foundational engineering in Computer Science, C++, Python, Spring Boot, and AI architectures equips him to adapt and execute on specialized targets.`;
  }

  return {
    matchScore: score,
    summary,
    matchedSkills: Array.from(new Set(matchedSkills)),
    relevantProjects: relevantProjects.length > 0 ? relevantProjects : [candidateProfile.projects[0], candidateProfile.projects[1]]
  };
}
