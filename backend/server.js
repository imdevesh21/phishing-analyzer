const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔐 Sample phishing keywords
const phishingKeywords = [
  "verify your account",
  "click here",
  "urgent action",
  "update payment",
  "confirm password",
  "login immediately",
  "unauthorized access",
  "suspended account"
];

// 🔗 Regex to find suspicious links
const urlRegex = /(http[s]?:\/\/[^\s]+)/gi;

app.post('/analyze', (req, res) => {
  const { emailText } = req.body;

  let score = 0;
  let foundKeywords = [];
  let foundLinks = emailText.match(urlRegex) || [];

  // Check for keywords
  phishingKeywords.forEach(keyword => {
    if (emailText.toLowerCase().includes(keyword)) {
      score += 2;
      foundKeywords.push(keyword);
    }
  });

  // Check if links are suspicious (e.g., non-https or strange domains)
  foundLinks.forEach(link => {
    if (!link.includes('https') || link.includes('bit.ly') || link.includes('tinyurl')) {
      score += 1;
    }
  });

  const result = {
    status: score >= 3 ? '⚠️ Potential Phishing' : '✅ Likely Safe',
    foundKeywords,
    foundLinks
  };

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
