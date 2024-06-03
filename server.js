const express = require('express');
const puppeteer = require('puppeteer');
const Sentiment = require('sentiment');
const path = require('path');

const app = express();
const sentiment = new Sentiment();

// Endpoint for sentiment analysis
app.get('/analyze', async (req, res) => {
  const url = req.query.url;

  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url);

    // Extract text content from the page
    const text = await page.$eval('*', (el) => el.innerText);

    // Perform sentiment analysis
    const result = sentiment.analyze(text);

    // Close the browser instance
    await browser.close();

    // Send the sentiment analysis results as JSON
    res.json(result);
  } catch (error) {
    // Handle errors
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while analyzing the sentiment.' });
  }
});

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
