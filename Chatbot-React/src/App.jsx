import { useState, useRef, useEffect } from 'react'
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
    if(!inputText.trim()) return;

    const newUserChatMessage = {id: crypto.randomUUID(), message: inputText.trim(), sender: 'user'};

    const loadingId = crypto.randomUUID();
    const loadingMessage = {id: loadingId, message: <img className='h-10' src={loadingSpinner} alt='Loading...' />, sender: 'chatdong'};
    setChatMessages(prev => [...prev, newUserChatMessage, loadingMessage]);
    setInputText('');

    try{
      const finalBotReply = await generateChatDongResponse(inputText);
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

function generateChatDongResponse(userText){
  const text = userText.toLowerCase().trim();

  const response = [
    {
      keywords: ['ano name mo', `what's your name?`, `what's your name`, 'ano pangalan mo'],
      reply: 'My name is ChatDong, your friendly chatbot assistant.'
    },
    {
      keywords: ['hello', 'hi', 'kamusta'],
      reply: 'Hello!, How can I help you.'
    },
    {
      keywords: ['i want to become a software engineer'],
      reply: 'You can absolutely do it! Anyone can learn how to code with time and practice.'
    },
    {
      keywords: ['thank you', 'salamat'],
      reply: 'No problem! Let me know if you need help with anything else!'
    }
  ];

  const matchedResponse = response.find(({keywords}) => 
    keywords.some(keyword => text.includes(keyword))
  );

  return matchedResponse ? matchedResponse.reply : 'I apologize, but I am unable to process that request. Please try asking differently.';
}

function ChatMessage({message, sender}){
  return(
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-x-3  mb-6`}>
      {sender === 'chatdong' && <img src={chatdong} className="cursor-pointer w-12.5" alt="Chatdong Icon" />} 
      <p className="text-[clamp(14px,3vw,17px)] bg-[rgb(238,238,238)] max-w-80 font-medium text-black m-0 leading-relaxed px-5 py-3.75 rounded-[10px]">{message}</p>
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
    <div className="h-screen max-w-2xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} /> 
    </div>
  );
}

export default App
