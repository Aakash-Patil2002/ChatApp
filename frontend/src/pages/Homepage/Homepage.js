import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Navbar from "../../components/Navbar/Navbar";
import NoChatSelected from "../../components/NoChatSelected/NoChatSelected";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useChatStore } from "../../store/useChatStore";
import style from './Homepage.module.css';
const Homepage = () => {
  const { selectedUser } = useChatStore();
  return (
    <>
      <Navbar />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 px-0">
              <Sidebar />
            </div>
            <div className="col-9 px-0">
              <div className={style.rightpart}>
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
