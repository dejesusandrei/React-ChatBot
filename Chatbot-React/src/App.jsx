import { useState, useRef, useEffect } from 'react'
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import './index.css'
import user from './assets/user.png'
import chatdong from './assets/chatdong.png'
import loadingSpinner from './assets/loading-spinner.gif'

function ChatInput({setChatMessages}){
  const [inputText, setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);
  }

  function handleKeyDown(event){
    if(event.key === 'Enter') sendMessage();
    if(event.key === 'Escape')setInputText('');
  }

  async function sendMessage(){
    const currentMessage = inputText.trim();
    if (!currentMessage) return;

    const newUserChatMessage = {id: crypto.randomUUID(), message: currentMessage, sender: 'user'};

    const loadingId = crypto.randomUUID();
    const loadingMessage = {id: loadingId, message: <img className='h-10' src={loadingSpinner} alt='Loading...' />, sender: 'chatdong'};
    setChatMessages(prev => [...prev, newUserChatMessage, loadingMessage]);
    setInputText('');

    try{
      const finalBotReply = await generateChatDongResponse(currentMessage);
      setTimeout(() =>{
        setChatMessages(prev => prev.map(msg => msg.id === loadingId ? {...msg, message: finalBotReply} : msg));
      }, 500);
    } catch(error){
      setChatMessages(prev => prev.map(msg => msg.id === loadingId ? {...msg, message: error.message} : msg));
    }
  }

  return(
    // Chat Input Container
    <div className="flex mb-12">
      <input onChange={saveInputText} onKeyDown={handleKeyDown} value={inputText} type="text" placeholder="Send a message to ChatDong" size="30"
        className="border rounded-[10px] grow px-3 py-3 border-w text-[15px]"
      />
      <button onClick={sendMessage}
        className="bg-[rgb(25,124,135)] cursor-pointer border-0 text-white text-[15px] font-semibold rounded-lg px-5 py-3 ml-2.5"
        >Send
      </button>
    </div>
  );
}


async function generateChatDongResponse(userText){
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

  return matchedResponse ? matchedResponse.reply : 'I apologize, but I am unable to process that request. Please try asking differently.';
}

function ChatMessage({message, sender}){
  return(
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-x-3  mb-6`}>
      {sender === 'chatdong' && <img src={chatdong} className="cursor-pointer w-12.5" alt="Chatdong Icon" />} 
      <div className="text-[clamp(14px,3vw,17px)] bg-[rgb(238,238,238)] max-w-100 font-medium text-black leading-relaxed px-5 py-3.75 markdown-content rounded-[10px]">
        {typeof message === 'string' ? (<ReactMarkdown>{message}</ReactMarkdown>) : (message)}
      </div>
      {sender === 'user' && <img src={user} className="cursor-pointer w-12.5" alt="User Icon" />} 
    </div>
  );
}

function useAutoScroll(dependencies){
  const containerRef = useRef(null);

  useEffect(() =>{
    const containerElement = containerRef.current;
    if(containerElement) {
      // smooth transition of scrolling
      requestAnimationFrame(() =>{
        containerElement.scrollTo({
          top: containerElement.scrollHeight,
          behavior: 'smooth'
        });
      });
    };
  }, [dependencies]);

  return containerRef;
}

function ChatMessages({chatMessages}){
  const chatMessageRef = useAutoScroll(chatMessages);

  return(
    // Chat Messages Container
    <div className="grow overflow-scroll scrollbar-none mt-10" ref={chatMessageRef}>
      {chatMessages.length === 0 ? <p className='text-gray-500 text-lg grow mt-5 text-center'>Welcome to the chatbot project! Send a message using the textbox below</p> : (
        chatMessages.map(({id, message, sender}) => <ChatMessage key={id} message={message} sender={sender} />)
      )}
    </div>
  );
}

function App(){
  const [chatMessages, setChatMessages] = useState([]);

  return(
    // App container
    <div className="h-screen max-w-4xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} /> 
    </div>
  );
}

export default App
