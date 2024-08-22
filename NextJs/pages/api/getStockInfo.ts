import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.EODHD_API_KEY; // Ensure this is set correctly in your .env.local file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol) {
    res.status(400).json({ error: 'Stock symbol is required' });
    return;
  }

  try {
    const url = `https://eodhd.com/api/real-time/${symbol}?api_token=${apiKey}&fmt=json`;

    // Log the URL to verify it is correct
    console.log(`Fetching data from URL: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      // Log the error message from the response
      console.error(`Failed to fetch stock data. Status: ${response.status}, Status Text: ${response.statusText}`);
      throw new Error('Failed to fetch stock data');
    }

    const data = await response.json();

    // Check if the response contains any errors or missing data
    if (!data) {
      console.error('No data returned from the API');
      res.status(500).json({ error: 'No data returned from the API' });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch stock data' });
  }
}
