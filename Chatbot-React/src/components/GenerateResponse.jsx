import { GoogleGenAI } from '@google/genai';

export async function GenerateResponse(userText){
  if (!userText || !userText.trim()) return "";
  const text = userText.toLowerCase().trim();

  const response = [
    {
      keywords: ['ano name mo', "what's your name?", "what's your name", 'ano pangalan mo', 'sino ka', 'who are you', 'what is your name'],
      reply: 'My name is ChatDong, your friendly chatbot assistant.'
    },
    {
      keywords: ['hello', 'hi', 'kamusta', 'musta', 'hey', 'greetings'],
      reply: 'Hello! I am ChatDong. How can I help you today?'
    },
    {
      keywords: ['sino gumawa', 'who created you', 'sino creator mo', 'sino nag gawa sayo', 'who made you', 'who built you'],
      reply: 'I was created by an awesome developer using JavaScript and Gemini AI!'
    },
    {
      keywords: ['kaya mong gawin', 'what can you do', 'ano kaya mo', 'ano features mo', 'help', 'how can you help'],
      reply: 'I can answer your questions, assist with writing, explain topics, or just have a friendly chat with you!'
    },
    {
      keywords: ['salamat', 'thank you', 'thanks', 'thx', 'tenkyu', 'thank you so much'],
      reply: 'You are very welcome! Happy to help. Is there anything else you need?'
    },
    {
      keywords: ['paalam', 'bye', 'goodbye', 'bye bye', 'aalis na ako', 'see you'],
      reply: 'Goodbye! Take care, and feel free to drop by whenever you need help again!'
    },
    {
      keywords: ['magkano', 'is it free', 'libre ka ba', 'how much', 'do i have to pay'],
      reply: 'I am 100% free to use! No payment required.'
    },
    {
      keywords: ['mabilis ka ba', 'are you smart', 'matalino ka ba', 'are you fast'],
      reply: 'I strive to be fast and accurate with the help of advanced AI models!'
    },
    {
      keywords: ['good morning', 'magandang umaga', 'morning'],
      reply: 'Good morning! I hope you have a great and productive day ahead!'
    },
    {
      keywords: ['good afternoon', 'magandang hapon', 'afternoon'],
      reply: 'Good afternoon! How is your day going so far?'
    },
    {
      keywords: ['good night', 'magandang gabi', 'tulog na ako', 'goodnight'],
      reply: 'Good night! Have a restful sleep and pleasant dreams.'
    },
    {
      keywords: ['ok', 'okay', 'cge', 'sige', 'got it', 'alright'],
      reply: 'Awesome! Let me know if you have any more questions.'
    },
    {
      keywords: ['taga saan ka', 'where do you live', 'saan ka nakatira', 'where are you located'],
      reply: 'I live in the cloud! Hosted on Vercel so I can assist you quickly from anywhere.'
    },
    {
      keywords: ['tao ka ba', 'are you human', 'are you real', 'totoo ka ba', 'are you a bot'],
      reply: 'I am not a human; I am an Artificial Intelligence (AI) assistant designed to help you out.'
    },
    {
      keywords: ['joke', 'patawa', 'patawa ka nga', 'tell me a joke', 'make me laugh'],
      reply: 'What is a computer’s favorite snack? ...Micro-chips! 🍟'
    },
    {
      keywords: ['masaya ka ba', 'how are you feeling', 'kumusta pakiramdam mo', 'how are you'],
      reply: 'Although I don’t have feelings, my code is always happy when I can help you out!'
    },
    {
      keywords: ['ang galing mo', 'nice one', 'great job', 'ang galing', 'you are awesome'],
      reply: 'Thank you so much! I am doing my best to be as helpful as possible.'
    }
  ];

  const matchedResponse = response.find(({keywords}) => 
    keywords.some(keyword => text.includes(keyword))
  );

  if (matchedResponse) {return matchedResponse.reply;}
  else {return 'Sorry, something went wrong with ChatDong.'}
  
  // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  // const ai = new GoogleGenAI({ apiKey });
  // try {
  // const res = await ai.models.generateContent({ 
  //   model: 'gemini-3.5-flash', 
  //   contents: text, 
  //   config: {
  //     systemInstruction: "You are ChatDong, a friendly and smart AI chat assistant. Never refer to yourself as Gemini or Google. If asked for your name, always reply that your name is ChatDong."
  //   }
  // });

  // return res.text;
  // } catch (error) {
  //   console.error("Gemini API Error details:", error);
  //   throw new Error("Sorry, something went wrong with ChatDong.");
  // }
}