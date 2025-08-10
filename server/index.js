const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 60000);

    const prompt = `
      Summarize the following text into:
      1. A short summary (2-3 sentences)
      2. Key bullet points
      3. Tags as array

      Text:
      ${text.slice(0, 60000)}
    `;

    // Call OpenAI API for summary
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      }),
    });

    const openaiData = await openaiRes.json();
    const summary = openaiData.choices?.[0]?.message?.content || 'No summary available';

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: 'Error fetching or summarizing content.' });
  }
});

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
