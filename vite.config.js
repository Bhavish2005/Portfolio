import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Helper function to fetch from Apify
const fetchApify = async (operation, token) => {
  const res = await fetch(`https://api.apify.com/v2/acts/taneja~leetcode-api-scraper/run-sync-get-dataset-items?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'Bhavish_2005', operation })
  });
  if (!res.ok) throw new Error(`Apify returned ${res.status}`);
  const data = await res.json();
  return data[0] ? data[0].data : {};
};

// Custom Vite Plugin to simulate Vercel's Serverless API locally with caching
const vercelApiMock = () => {
  return {
    name: 'vercel-api-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/leetcode') {
          try {
            // 1. FILE-SYSTEM CACHE (Protects your Apify credits during local dev)
            const cachePath = path.resolve('.leetcode_cache.json');
            if (fs.existsSync(cachePath)) {
              const stats = fs.statSync(cachePath);
              // If cache is less than 24 hours old, serve it instantly
              if (Date.now() - stats.mtimeMs < 86400000) {
                console.log("[Vite API Mock] Serving LeetCode data from local file cache (saves Apify credits!)");
                const cachedData = fs.readFileSync(cachePath, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                return res.end(cachedData);
              }
            }

            // 2. TOKEN FETCH
            let apifyToken = null;
            const envPaths = [path.resolve('.env'), path.resolve('.env.example')];
            
            for (const envPath of envPaths) {
              if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, 'utf-8');
                const tokenMatch = envContent.match(/APIFY_TOKEN=(.+)/);
                if (tokenMatch) {
                  apifyToken = tokenMatch[1].trim();
                  break;
                }
              }
            }

            if (!apifyToken) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Token not found in .env or .env.example' }));
            }

            console.log("[Vite API Mock] Cache missed/expired. Fetching 3 endpoints from Apify concurrently...");
            
            // 3. CONCURRENT APIFY FETCH
            const [summary, language, skills] = await Promise.all([
              fetchApify('userSummary', apifyToken),
              fetchApify('userLanguageStats', apifyToken),
              fetchApify('userSkillStats', apifyToken)
            ]);

            const finalData = { summary, language, skills };
            
            // 4. WRITE CACHE
            fs.writeFileSync(cachePath, JSON.stringify(finalData));

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(finalData));
          } catch (error) {
            console.error("Local API Mock Error:", error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), vercelApiMock()],
});
