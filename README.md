# 🚀 Bhavish Pushkarna | Developer Portfolio

A premium, highly interactive portfolio website built to showcase engineering projects, technical achievements, and real-time systems architecture. 

The application utilizes cinematic GSAP scroll animations, real-time background canvas rendering, and frosted glassmorphism to create a luxurious, "Apple-like" user experience.

## ✨ Features

- **LEO - AI Portfolio Assistant:** An integrated RAG (Retrieval-Augmented Generation) AI Assistant powered by Groq and Llama 3.1, ready to answer questions about Bhavish's technical skills, work ethic, and architecture decisions.
- **JD Compatibility Analyzer:** Paste a Job Description to instantly calculate a compatibility match score based on technical stack and project relevance.
- **Interactive Journey Tracker:** A sleek, gamified timeline tracker that persists progress across page loads, awarding users with a cinematic GSAP confetti burst upon 100% completion of the portfolio.
- **Cinematic Scroll Animations:** Built with GSAP ScrollTrigger, featuring massive, buttery-smooth background face transitions that natively scale and track scrolling.
- **Dynamic Project Case Studies:** Uses `react-router-dom` and `react-markdown` to dynamically fetch and beautifully render live `README.md` files directly from GitHub repositories.
- **Live LeetCode & GitHub Metrics:** Integrates directly with the LeetCode GraphQL API and GitHub REST API to pull live contest ratings and contribution graphs.
- **Ultra-Premium UI:** Custom glassmorphism, responsive canvas scaling, dynamic typography, and completely smooth CSS transitions.

## 🛠️ Technology Stack

- **Framework:** React + Vite
- **Animations:** GSAP (GreenSock Animation Platform) & ScrollTrigger
- **Scroll Hijacking:** Lenis (for buttery smooth scrolling)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, CSS Modules) + Tailwind CSS (available)
- **Content Parsing:** `react-markdown` + `remark-gfm`
- **Icons:** `lucide-react` & `react-icons`

## ⚙️ Getting Started

To run this project locally:

```bash
# 1. Clone the repository
git clone <your-repo-link>

# 2. Navigate to the directory
cd Portfolio

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

## 🌐 Deployment

This project is optimized for deployment on Vercel. 
Ensure you have set up any necessary API keys (like GitHub PAT for rate limits) in your Vercel Environment Variables.

```bash
# Production build
npm run build
```

---
*Designed & Architected by Bhavish Pushkarna*
