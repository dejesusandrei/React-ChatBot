import { useState } from 'react'
import { GenerateResponse } from './GenerateResponse'
import '../index.css'
import loadingSpinner from '../assets/loading-spinner.gif'

export function ChatInput({setChatMessages}){
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
      const finalBotReply = await GenerateResponse(currentMessage);
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