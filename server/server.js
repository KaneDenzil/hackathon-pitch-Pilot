import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/notion', async (req, res) => {
  const pageIds = process.env.NOTION_PAGE_IDS?.split(',') || [];
  const databaseId = process.env.NOTION_DATABASE_ID;
  const allResults = [];

  try {
    // Step 1: Manual pages
    for (const pageId of pageIds) {
      const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        allResults.push({ source: 'manual', pageId, blocks: data.results });
      } else {
        allResults.push({ source: 'manual', pageId, error: data.message });
      }
    }

    // Step 2: Pages from database
    if (databaseId) {
      const dbRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      });

      const dbData = await dbRes.json();

      for (const page of dbData.results || []) {
        const pageId = page.id;

        const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
        });

        const blocks = await blocksRes.json();
        if (blocksRes.ok) {
          allResults.push({ source: 'database', pageId, blocks: blocks.results });
        } else {
          allResults.push({ source: 'database', pageId, error: blocks.message });
        }
      }
    }

    res.json({ success: true, pages: allResults });
  } catch (err) {
    console.error('❌ Error fetching Notion pages:', err);
    res.status(500).send('Server error fetching Notion pages');
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Notion proxy server running at http://localhost:${PORT}`);
});
