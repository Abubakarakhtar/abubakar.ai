ABU BAKAR AI — UPLOAD/DEPLOY

This is a ChatGPT-style AI website with a secure server-side API key.

1. Upload these files to a Node.js hosting service.
2. Run: npm install
3. Add environment variable:
   OPENAI_API_KEY = your OpenAI API key
4. Start command: npm start
5. Open the website URL.

IMPORTANT:
Do NOT put your OpenAI API key inside index.html. The server keeps it private.

For GitHub Pages/static hosting, this exact version cannot safely call OpenAI directly because the API key would be exposed. Use a Node.js/serverless host.

The chat history is saved in the browser's localStorage.
