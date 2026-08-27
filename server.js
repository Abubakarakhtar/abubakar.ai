const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({limit:"10mb"}));
app.use(express.static(path.join(__dirname)));

app.post("/api/chat", async (req,res)=>{
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({error:"OPENAI_API_KEY is not configured on the server."});
    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const response = await fetch("https://api.openai.com/v1/responses", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+apiKey
      },
      body:JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: messages,
        instructions: "You are ABU BAKAR AI, a helpful, friendly and accurate AI assistant. Answer clearly and naturally."
      })
    });
    const data = await response.json();
    if(!response.ok) return res.status(response.status).json({error:data.error?.message || "OpenAI API error"});
    const reply = data.output_text || (data.output||[]).flatMap(x=>x.content||[]).map(x=>x.text||"").join("") || "I couldn't generate a response.";
    res.json({reply});
  } catch(e) {
    res.status(500).json({error:e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`ABU BAKAR AI running on port ${PORT}`));
