// Helper function to fetch from Apify
const fetchApify = async (operation, token) => {
  const response = await fetch(`https://api.apify.com/v2/acts/taneja~leetcode-api-scraper/run-sync-get-dataset-items?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: "Bhavish_2005", operation })
  });
  
  if (!response.ok) throw new Error(`Apify returned ${response.status}`);
  const data = await response.json();
  return data[0] ? data[0].data : {};
};

export default async function handler(req, res) {
  const apifyToken = process.env.APIFY_TOKEN;
  
  if (!apifyToken) {
    return res.status(500).json({ 
      error: 'Apify API token is missing. Please add APIFY_TOKEN to your Vercel Environment Variables.' 
    });
  }

  try {
    // Fetch all necessary data concurrently to minimize cold start time
    const [summary, language, skills] = await Promise.all([
      fetchApify('userSummary', apifyToken),
      fetchApify('userLanguageStats', apifyToken),
      fetchApify('userSkillStats', apifyToken)
    ]);

    const finalData = { summary, language, skills };
    
    // VERCEL EDGE CACHING
    // Ensures this massive API fetch only happens ONCE per 24 hours globally.
    // Extremely fast for visitors, saves massive amounts of Apify compute credits.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');
    
    res.status(200).json(finalData);
  } catch (error) {
    console.error("Apify Fetch Error:", error);
    res.status(500).json({ error: 'Failed to fetch data from Apify.' });
  }
}
