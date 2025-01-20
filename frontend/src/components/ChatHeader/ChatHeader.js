import React from "react";
import { useChatStore } from "../../store/useChatStore";
import style from "./ChatHeader.module.css";
function ChatHeader() {
  const { selectedUser } = useChatStore();

  return (
    <div className="">
      <div className={style.header+" d-flex w-100"}>
        <div className="me-4">
          <img
            className={style.profilePic}
            src={
              selectedUser.profilePic
                ? selectedUser.profilePic
                : "https://via.placeholder.com/100"
            }
            alt={selectedUser.name}
          />
        </div>
        <div className={style.profDetails}>
          <h6>{selectedUser.fullName}</h6>
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
