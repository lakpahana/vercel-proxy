import fetch from 'node-fetch';

export default async (req, res) => {
  

 const baseUrl = 'https://kattis-badge-go-empty-brook-9555.fly.dev';

 const additionalPath = req.url.replace(/^\/api\/proxy/, '');

 const targetUrl = `${baseUrl}${additionalPath}`;

  console.log(targetUrl)

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

if (req.method === 'OPTIONS') {
  return res.status(200).end();
}
 try {
   const response = await fetch(targetUrl, {
     method: req.method,
     headers: req.headers,
     body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
   });
   
   const data = await response.text();
   res.status(response.status);
   for (const [key, value] of response.headers) {
     res.setHeader(key, value);
   }
   res.send(data);
 } catch (error) {
   console.error('Error proxying the request:', error);
   res.status(500).send(`Internal Server Error: ${error.message}`);
 }
};
