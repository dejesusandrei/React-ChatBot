import { UseAutoScroll } from './UseAutoScroll'
import { ChatMessage } from './ChatMessage'
import '../index.css'

export function ChatMessages({chatMessages}){
  const chatMessageRef = UseAutoScroll(chatMessages);
  return(
    // Chat Messages Container
    <div className="grow overflow-scroll scrollbar-none mt-10" ref={chatMessageRef}>
      {chatMessages.length === 0 ? <p className='text-gray-500 text-lg grow mt-5 text-center'>Welcome to the chatbot project! Send a message using the textbox below</p> : (
        chatMessages.map(({id, message, sender}) => <ChatMessage key={id} message={message} sender={sender} />)
      )}
    </div>
  );
}