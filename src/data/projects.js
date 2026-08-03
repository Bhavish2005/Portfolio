// Nexus Assets
import nexusAppScreen0 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-29-29.png';
import nexusAppScreen1 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-31-36.png';
import nexusAppScreen2 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-32-18.png';
import nexusAppScreen3 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-33-26.png';
import nexusAppScreen4 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-33-36.png';
import nexusAppScreen5 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-34-11.png';
import nexusAppScreen6 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-34-23.png';
import nexusAppScreen7 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-34-55.png';
import nexusAppScreen8 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-35-17.png';
import nexusAppScreen9 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-35-25.png';
import nexusAppScreen10 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-36-37.png';
import nexusAppScreen11 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-36-42.png';
import nexusAppScreen12 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-36-57.png';
import nexusAppScreen13 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-37-19.png';
import nexusAppScreen14 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-37-32.png';
import nexusAppScreen15 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-37-44.png';
import nexusAppScreen16 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-37-56.png';
import nexusAppScreen17 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-38-58.png';
import nexusAppScreen18 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-39-10.png';
import nexusAppScreen19 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-39-40.png';
import nexusAppScreen20 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-40-05.png';
import nexusAppScreen21 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-42-06.png';
import nexusAppScreen22 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-42-22.png';
import nexusAppScreen23 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-42-31.png';
import nexusAppScreen24 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-42-50.png';
import nexusAppScreen25 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-43-03.png';
import nexusAppScreen26 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-43-12.png';
import nexusAppScreen27 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-43-19.png';
import nexusAppScreen28 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-43-34.png';
import nexusAppScreen29 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-43-54.png';
import nexusAppScreen30 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-44-03.png';
import nexusAppScreen31 from '../assets/Nexus Intelligence/Screenshot From 2026-05-01 21-44-12.png';
import nexusCover from '../assets/Nexus Intelligence/Nexus Intelligence(3).png';
import nexusSecLayer from '../assets/Nexus Intelligence/Secutiry_layer.png';

// Cuda Assets
import cudaCover from '../assets/Cuda/memory_throughput_3d(1).png';
import cudaVideo from '../assets/Cuda/Screencast From 2026-07-30 23-38-11.mp4';
import cudaPdf from '../assets/Cuda/UCS645_Report.pdf';
import cudaImg1 from '../assets/Cuda/cpu_vs_gpu_time_2d(1).png';
import cudaImg2 from '../assets/Cuda/fps_scaling_2d(1).png';

// FinanceVUE Assets
import finCover from '../assets/FinanceVue/Screenshot 2026-07-30 182926.png';
import fin1 from '../assets/FinanceVue/Screenshot 2026-07-30 182936.png';
import fin2 from '../assets/FinanceVue/Screenshot 2026-07-30 182945.png';
import fin3 from '../assets/FinanceVue/Screenshot 2026-07-30 182953.png';
import fin4 from '../assets/FinanceVue/Screenshot 2026-07-30 183003.png';
import fin5 from '../assets/FinanceVue/Screenshot 2026-07-30 183011.png';
import fin6 from '../assets/FinanceVue/Screenshot 2026-07-30 183016.png';
import fin7 from '../assets/FinanceVue/Screenshot 2026-07-30 183024.png';
import fin8 from '../assets/FinanceVue/Screenshot 2026-07-30 183031.png';
import fin9 from '../assets/FinanceVue/Screenshot 2026-07-30 183046.png';
import fin10 from '../assets/FinanceVue/Screenshot 2026-07-30 183057.png';

// FixMate Assets

import fixCover from '../assets/fixmate/Screenshot 2026-07-30 182456.png' ;
import fix1 from '../assets/fixmate/dashboard.png';
import fix2 from '../assets/fixmate/ide1.png';
import fix4 from '../assets/fixmate/login.png';
import fix3 from '../assets/fixmate/signup.png';



export const projectsData = [
  {
    id: 1,
    title: 'Nexus Intelligence',
    subtitle: 'Autonomous AI Data Pipeline',
    description: 'A 6-layer AI-powered natural language to SQL/data pipeline system. Features a Redis-backed semantic caching layer utilizing ChromaDB embeddings to drastically reduce latency and API costs.',
    tools: ['Python', 'LangGraph', 'Groq API', 'Llama 3.1', 'PostgreSQL', 'ChromaDB', 'Redis'],
    year: 'Apr - May 2026',
    githubLink: 'https://github.com/Bhavish2005/Nexus_Intelligence',
    liveLink: '',
    problemStatement: 'When building AI-powered data pipelines, redundant LLM queries can quickly burn through API costs and drastically increase latency. I engineered Nexus Intelligence to solve this by creating a 6-layer architecture with a semantic caching layer. It understands the intent of a query, skipping the LLM entirely for semantically similar questions.',
    architectureDeepDive: 'Nexus Intelligence operates on a 6-layer architecture designed to minimize LLM overhead. When a query is received, it first hits the Semantic Cache (Layer 1). The query is embedded using ChromaDB and checked against previous queries. If it\'s a match, we return the cached response instantly. If not, it passes to the Intent Router (Layer 2), which decides if the query requires standard RAG document retrieval or strict SQL database execution. This deterministic state routing is handled via LangGraph. Finally, the Multi-Agent SQL layer breaks the task down: a Planner agent structures the logic, a Coder agent generates the raw SQL, and a Validator agent tests it.',
    challengesOvercome: 'The biggest challenge was preventing the LLM from executing destructive or hallucinated SQL commands on the production database. I solved this by implementing a Multi-Agent Validator system. Before any SQL is executed, the Validator agent runs it against a read-only replica schema in a sandbox to catch syntax errors or destructive intents (like DROP TABLE). This ensured 100% database safety.',
    features: [
      '6-layer retrieval pipeline including an Intent Router and Storyteller',
      'Redis-backed semantic caching layer utilizing ChromaDB embeddings',
      'Dynamic vector-based schema retrieval without hardcoding',
      'Deterministic state machine using LangGraph to route queries between RAG and strict SQL'
    ],
    highlights: [
      'Achieved ultra-fast LLM inference using Groq API (Llama 3.1 & Mixtral)',
      'Designed a Multi-Agent SQL system with specialized planner, coder, and validator agents',
      'Implemented a secure read-only database sandbox with a complete query audit trail'
    ],
    coverImage: nexusCover,
    media: [
      { type: 'image', src: nexusSecLayer, title: 'Security Layer Architecture' },
      { type: 'image', src: nexusAppScreen0, title: 'App Screenshot 1' },
      { type: 'image', src: nexusAppScreen1, title: 'App Screenshot 2' },
      { type: 'image', src: nexusAppScreen2, title: 'App Screenshot 3' },
      { type: 'image', src: nexusAppScreen3, title: 'App Screenshot 4' },
      { type: 'image', src: nexusAppScreen4, title: 'App Screenshot 5' },
      { type: 'image', src: nexusAppScreen5, title: 'App Screenshot 6' },
      { type: 'image', src: nexusAppScreen6, title: 'App Screenshot 7' },
      { type: 'image', src: nexusAppScreen7, title: 'App Screenshot 8' },
      { type: 'image', src: nexusAppScreen8, title: 'App Screenshot 9' },
      { type: 'image', src: nexusAppScreen9, title: 'App Screenshot 10' },
      { type: 'image', src: nexusAppScreen10, title: 'App Screenshot 11' },
      { type: 'image', src: nexusAppScreen11, title: 'App Screenshot 12' },
      { type: 'image', src: nexusAppScreen12, title: 'App Screenshot 13' },
      { type: 'image', src: nexusAppScreen13, title: 'App Screenshot 14' },
      { type: 'image', src: nexusAppScreen14, title: 'App Screenshot 15' },
      { type: 'image', src: nexusAppScreen15, title: 'App Screenshot 16' },
      { type: 'image', src: nexusAppScreen16, title: 'App Screenshot 17' },
      { type: 'image', src: nexusAppScreen17, title: 'App Screenshot 18' },
      { type: 'image', src: nexusAppScreen18, title: 'App Screenshot 19' },
      { type: 'image', src: nexusAppScreen19, title: 'App Screenshot 20' },
      { type: 'image', src: nexusAppScreen20, title: 'App Screenshot 21' },
      { type: 'image', src: nexusAppScreen21, title: 'App Screenshot 22' },
      { type: 'image', src: nexusAppScreen22, title: 'App Screenshot 23' },
      { type: 'image', src: nexusAppScreen23, title: 'App Screenshot 24' },
      { type: 'image', src: nexusAppScreen24, title: 'App Screenshot 25' },
      { type: 'image', src: nexusAppScreen25, title: 'App Screenshot 26' },
      { type: 'image', src: nexusAppScreen26, title: 'App Screenshot 27' },
      { type: 'image', src: nexusAppScreen27, title: 'App Screenshot 28' },
      { type: 'image', src: nexusAppScreen28, title: 'App Screenshot 29' },
      { type: 'image', src: nexusAppScreen29, title: 'App Screenshot 30' },
      { type: 'image', src: nexusAppScreen30, title: 'App Screenshot 31' },
      { type: 'image', src: nexusAppScreen31, title: 'App Screenshot 32' }
    ]
  },
  {
    id: 2,
    title: 'High-Performance Ray Tracer',
    subtitle: 'CUDA C++ Engine',
    description: 'A real-time CUDA-accelerated ray tracer built with OpenGL for interactive 3D rendering. Offloads mathematical heavy lifting to NVIDIA GPUs for massive compute speedups.',
    tools: ['C++', 'CUDA', 'OpenGL', 'Parallel Computing', 'High-Performance Computing'],
    year: 'Feb - Apr 2026',
    githubLink: 'https://github.com/Anish7877/Cuda-Raytracer',
    liveLink: '',
    problemStatement: 'Rendering high-resolution 3D scenes on a CPU is painfully slow. I wanted to push the limits of real-time graphics rendering by offloading the mathematical heavy lifting directly to NVIDIA GPU cores. Building a custom ray tracing engine from scratch in CUDA C++ completely changed my understanding of parallel computing and memory access patterns.',
    architectureDeepDive: 'This engine bypasses the CPU entirely for rendering, executing heavily parallelized ray-triangle intersections directly on NVIDIA GPU cores using CUDA C++. To achieve real-time 60FPS rendering, I implemented a Bounding Volume Hierarchy (BVH). Instead of checking every ray against every triangle (O(N)), the BVH spatially partitions the 3D scene into a tree of bounding boxes, reducing the intersection complexity to O(log N). The OpenGL context is mapped directly to a CUDA graphics resource, allowing the GPU to write pixel data straight to the display buffer without expensive CPU memory transfers.',
    challengesOvercome: 'Early versions of the engine suffered from severe GPU bottlenecking due to uncoalesced memory accesses. When adjacent threads (warp) accessed scattered memory locations for triangle data, the memory bandwidth plummeted. I engineered a solution by reorganizing the BVH data structures into Contiguous Memory Arrays (Structure of Arrays) and aligning the memory bounds. This optimization allowed threads to load data in single, coalesced transactions, rocketing the SM utilization up to 98%.',
    features: [
      'CUDA-accelerated ray tracing for real-time performance',
      'Interactive camera control with mouse navigation and dynamic lighting',
      'Cross-platform real-time rendering with OpenGL display',
      'Custom Bounding Volume Hierarchy (BVH) traversal algorithm to reduce intersection complexity'
    ],
    highlights: [
      'Engineered a massively parallel GPU ray-tracing architecture',
      'Optimized memory coalescence to eliminate GPU bottlenecks',
      'Built a highly performant rendering pipeline leveraging GLFW3 and GLEW'
    ],
    coverImage: cudaCover,
    media: [
      { type: 'video', src: cudaVideo, title: 'Real-Time Ray Tracer Demo' },
      { type: 'document', src: cudaPdf, title: 'UCS645 Report.pdf', filename: 'CUDA_Raytracer_Report.pdf' },
      { type: 'image', src: cudaImg1, title: 'CPU vs GPU Time (2D)' },
      { type: 'image', src: cudaImg2, title: 'FPS Scaling (2D)' }
    ]
  },
  {
    id: 3,
    title: 'FinanceVUE',
    subtitle: 'Intelligent Real-Time Platform',
    description: 'Full-Stack AI-Powered Personal Finance Management System. Track spending, scan receipts with Gemini AI, score your financial health, and get monthly automated reports.',
    tools: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Redis', 'Gemini AI', 'JWT'],
    year: 'Dec 2025 - May 2026',
    githubLink: 'https://github.com/Bhavish2005/Finance_SpringBoot',
    liveLink: '',
    problemStatement: 'Managing personal finances is tedious, and existing apps rely heavily on manual data entry. I wanted to build a production-grade platform where users can simply snap a picture of a receipt, and let a multimodal AI instantly extract the merchant, amount, date, and category. FinanceVUE removes the friction from budgeting while giving users a clear Financial Health Score based on their real spending data.',
    architectureDeepDive: 'FinanceVUE is built on a robust Spring Boot backend architecture. The core transaction engine uses Spring Data JPA for ACID-compliant PostgreSQL database operations, ensuring that whenever a transaction is logged, account balances are atomically updated. To prevent API abuse on the expensive Gemini AI endpoints, I implemented distributed rate-limiting using Bucket4j and Redis. When a user uploads a receipt, the Gemini 2.0 Flash model processes the image and returns a strictly formatted JSON payload, which the backend instantly maps to a Transaction entity.',
    challengesOvercome: 'One of the hardest features to implement was the automated monthly budget alerting system. Initially, running a scheduled task to check every user\'s budget against their transactions was overloading the database. I optimized this by using Spring Data Redis to cache monthly transaction aggregates, and implemented JavaMailSender on a separate asynchronous thread pool. Now, the system scales effortlessly, checking thresholds and firing off 80% and 100% budget alerts instantly without blocking the main application thread.',
    features: [
      'Gemini 2.0 Flash AI Receipt Scanner for automatic data extraction',
      'Multi-Account Management with real-time balance correction',
      'Bucket4j Rate Limiting via Redis to prevent AI endpoint spam',
      'Gamified budget tracking system with automated JavaMail alerts at 80% and 100% thresholds'
    ],
    highlights: [
      'Engineered a production-grade Spring Boot REST API with stateless JWT authentication',
      'Implemented high-performance dashboard analytics retrieval powered by Spring Data Redis',
      'Developed an automated monthly HTML email summary system using JavaMailSender'
    ],
    coverImage: finCover,
    media: [
      { type: 'image', src: fin1, title: 'App Screenshot 1' },
      { type: 'image', src: fin2, title: 'App Screenshot 2' },
      { type: 'image', src: fin3, title: 'App Screenshot 3' },
      { type: 'image', src: fin4, title: 'App Screenshot 4' },
      { type: 'image', src: fin5, title: 'App Screenshot 5' },
      { type: 'image', src: fin6, title: 'App Screenshot 6' },
      { type: 'image', src: fin7, title: 'App Screenshot 7' },
      { type: 'image', src: fin8, title: 'App Screenshot 8' },
      { type: 'image', src: fin9, title: 'App Screenshot 9' },
      { type: 'image', src: fin10, title: 'App Screenshot 10' }
    ]
  },
  {
    id: 4,
    title: 'FixMate',
    subtitle: 'AI Pair-Programming Platform',
    description: 'A real-time collaborative code editor designed for pair programming. Features integrated video chat, instant code execution, and an AI-powered Debug-Buddy.',
    tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Stream'],
    year: 'Aug - Nov 2025',
    githubLink: 'https://github.com/Bhavish2005/fixmate-cc-ide',
    liveLink: 'https://fixmate.qzz.io/', 
    problemStatement: 'Remote pair programming or technical interviews often force developers to juggle Zoom, VS Code, and Slack. I built FixMate to eliminate this context switching by combining a real-time collaborative execution environment, live video chat, and a context-aware AI debugger into one seamless platform.',
    architectureDeepDive: 'FixMate operates on a Node.js/Express backend that orchestrates real-time events via Socket.io. To support seamless collaborative coding, I engineered an Operational Transformation (OT) layer. When two users type simultaneously, the OT layer resolves the conflicts by tracking the exact index of insertions/deletions and transforming them before broadcasting the state to the room. The video and text chat panels are integrated directly into the workspace using the Stream.io React SDK, utilizing WebRTC for ultra-low latency peer-to-peer communication.',
    challengesOvercome: 'Building the in-browser code execution was particularly difficult due to security concerns. If users can run arbitrary code, they could potentially execute malicious scripts on the server. I overcame this by integrating the Piston API, which executes the users\' code in highly isolated, ephemeral Docker containers. This ensures that any infinite loops, memory leaks, or malicious system calls are safely contained and destroyed after execution, keeping the FixMate platform completely secure.',
    features: [
      'Real-time collaborative code editing powered by Socket.io',
      'Integrated high-quality WebRTC video and text chat panels using Stream',
      'Instant in-browser code execution using the Piston API',
      'Architected a low-latency Operational Transformation (OT) layer for conflict-free concurrent editing'
    ],
    highlights: [
      'Integrated a Google Gemini AI "Debug-Buddy" to explain errors and refactor code',
      'Built a personal dashboard to track coding activity and visualize success/error rates',
      'Implemented full user authentication with secure JWTs and Firebase Google OAuth 2.0'
    ],
    coverImage: fixCover,
    media: [
      { type: 'image', src: fix1, title: 'User Dashboard' },
      { type: 'image', src: fix2, title: 'Login Screen' },
      { type: 'image', src: fix3, title: 'Signup Screen' },
      { type: 'image', src: fix4, title: 'Platform Screenshot' }
    ]
  }
];
