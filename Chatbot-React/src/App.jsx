import { useState, useRef, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages';
import './index.css'

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
