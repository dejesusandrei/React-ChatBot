import '../index.css'
import user from '../assets/user.png'
import chatdong from '../assets/chatdong.png'
import ReactMarkdown from 'react-markdown';

export function ChatMessage({message, sender}){
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