import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  console.log(">>> PUMASOK ANG REQUEST SA HANDLER! <<<");

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message } = req.body;
    const rawKey = process.env.GEMINI_API_KEY;
    const apiKey = rawKey ? rawKey.trim() : null;

    if (!apiKey) {
      console.error("LOGS: API Key is MISSING or EMPTY!");
    } else {
      console.log(`LOGS: API Key found. Length: ${apiKey.length} characters.`);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
			model: "gemini-3.6-flash",     
			systemInstruction: "You are ChatDong, a friendly and smart AI chat assistant. Never refer to yourself as Gemini or Google. If asked for your name, always reply that your name is ChatDong."
		});

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });

  } catch (error) {
    console.error("GEMINI ERROR DETAILS:", error.message);
    return res.status(500).json({ error: "AI Error: " + error.message });
  }
}