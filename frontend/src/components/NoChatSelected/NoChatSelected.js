import React from 'react'
import style from './NoChatSelected.module.css';
import chat from '../../assets/message.png';
function NoChatSelected() {
  return (
    <div className={style.rightpart}>
        <div className='text-center'>
            <img className='mx-auto mb-3' src={chat} alt='chat-icon'/>
            <h4>Welcome to Chatty</h4>
            <p>Select the conversation from sidebar to start chatting</p>
        </div>
    </div>
  )
}

export default NoChatSelected