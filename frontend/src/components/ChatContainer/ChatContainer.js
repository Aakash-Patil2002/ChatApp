import React, { useEffect, useRef } from "react";
import style from "./ChatContainer.module.css";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import ChatBubble from "../ChatBubble/ChatBubble";
function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const messagesEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <div className={style.loding_body}><span>Loading...</span></div>

  return (
    <main>
      <div className={style.chatContainer}>
        <ChatHeader />
        <div className={style.message_container + " container-fluid"}>
          {messages.map((message, idx) => {
            return <ChatBubble key={idx} message={message} />;
          })}
          <div ref={messagesEndRef}></div>
        </div>
        <MessageInput />
      </div>
    </main>
  );
}

export default ChatContainer;
