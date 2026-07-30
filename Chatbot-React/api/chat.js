import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Siguraduhin na POST request lang ang tinatanggap
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are ChatDong, a friendly and smart AI chat assistant. Never refer to yourself as Gemini or Google. If asked for your name, always reply that your name is ChatDong."
  });

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate response" });
  }
}