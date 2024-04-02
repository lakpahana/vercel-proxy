import axios from 'axios';

export default async (req, res) => {
  const baseUrl = 'https://kattis-badge-go-empty-brook-9555.fly.dev';
  const additionalPath = req.url.replace(/^\/api\/proxy/, '');
  const targetUrl = `${baseUrl}${additionalPath}`;

  console.log(targetUrl);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const axiosConfig = {
      method: req.method,
      headers: req.headers,
      timeout: 5000,
    };

    if (req.method === 'POST') {
      axiosConfig.data = req.body;
    }

    const response = await axios(targetUrl, axiosConfig);

    res.status(response.status);

    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(key, value);
    }

    res.send(response.data);
  } catch (error) {
    console.error('Error proxying the request:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};
