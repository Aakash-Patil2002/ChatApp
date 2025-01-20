import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import style from "./ChatBubble.module.css";
import { useChatStore } from "../../store/useChatStore";
const ChatBubble = ({ message }) => {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();

  return (
    <>
      {message.senderId === authUser._id ? (
        <div className={style.sender}>
          <div className={style.maxwidth+" d-flex gap-3 align-items-center ms-auto"}>
            <div className={style.chatContent}>
              <div className={style.img_wrapper}>
                {message.image && (
                  <img
                    className={style.chatimg}
                    src={message.image}
                    alt="img"
                  />
                )}
              </div>
              <p>{message.text}</p>
            </div>
            <div className={style.prof_pic}>
              <img
                className="img-fluid"
                src={authUser.profilePic?authUser.profilePic:"https://via.placeholder.com/100"}
                alt="profile pic"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={style.receiver}>
            <div className={style.maxwidth+" d-flex gap-3 align-items-center me-auto"}>
              <div className={style.prof_pic}>
                <img
                  className="img-fluid"
                  src={selectedUser.profilePic?selectedUser.profilePic:"https://via.placeholder.com/100"}
                  alt="profile pic"
                />
              </div>
              <div className={style.chatContent}>
                <div className={style.img_wrapper}>
                  {message.image && (
                    <img
                      className={style.chatimg}
                      src={message.image}
                      alt="img"
                    />
                  )}
                </div>
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBubble;
