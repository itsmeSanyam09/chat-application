import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatConatiner = () => {
    const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages} = useChatStore();
    const {authUser}=useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(()=>{
        getMessages(selectedUser._id);

        subscribeToMessages();

        return()=>unsubscribeFromMessages();
        
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages]);
    useEffect(()=>{
      if(messageEndRef.current&&messages){
              messageEndRef.current.scrollIntoView({behavior:"smooth"});
      }

    },[messages])
    if(isMessagesLoading) return <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />

    </div>;

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message)=>(
            <div 
            key={message._id}
            className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`}
            ref={messageEndRef}>
              <div className='chat-image avatar'>
                <div className="size-10 rounded-full border">
                  <img src={message.senderId ===authUser._id ?authUser.profilePic||"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Ficons%2Favatar&psig=AOvVaw32Y1poZeburjuoMX6ztm2y&ust=1740493546034000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCLD51_PB3IsDFQAAAAAdAAAAABAE":selectedUser.profilePic||"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Ficons%2Favatar&psig=AOvVaw32Y1poZeburjuoMX6ztm2y&ust=1740493546034000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCLD51_PB3IsDFQAAAAAdAAAAABAE"} alt="profile pic" />

                </div>

              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                  </time>
              </div>
              <div className="chat-bubble flex ">
                {message.image && (
                  <img src={message.image} alt="message" className='sm:max-w-[200px] rounded-md mb-2' />

                )}
                {message.text && <p>{message.text}</p>}

              </div>

            </div>
          ))}

        </div>
        <MessageInput />
    </div>
  )
} 

export default ChatConatiner
