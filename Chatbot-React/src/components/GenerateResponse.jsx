import { GoogleGenAI } from '@google/genai';

export async function GenerateResponse(userText){
  if (!userText || !userText.trim()) return "";
  const text = userText.toLowerCase().trim();

  const response = [
    {
      keywords: ['ano name mo', `what's your name?`, `what's your name`, 'ano pangalan mo'],
      reply: 'My name is ChatDong, your friendly chatbot assistant.'
    },
    {
      keywords: ['hello', 'hi', 'kamusta'],
      reply: 'Hello! Ako si ChatDong. How can I help you today?'
    }
  ];

  const matchedResponse = response.find(({keywords}) => 
    keywords.some(keyword => text.includes(keyword))
  );

  if (matchedResponse) return matchedResponse.reply;
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  try {
  const res = await ai.models.generateContent({ 
    model: 'gemini-3.5-flash', 
    contents: text, 
    config: {
      systemInstruction: "You are ChatDong, a friendly and smart AI chat assistant. Never refer to yourself as Gemini or Google. If asked for your name, always reply that your name is ChatDong."
    }
  });

  return res.text;
  } catch (error) {
    console.error("Gemini API Error details:", error);
    throw new Error("Sorry, something went wrong with ChatDong.");
  }
}