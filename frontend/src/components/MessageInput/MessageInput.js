import React, { useRef, useState } from "react";
import style from "./MessageInput.module.css";
import { Image } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { X ,Send} from "lucide-react";
import uploadFile from "../../helpers/uploadFile";
import toast from "react-hot-toast";
function MessageInput() {
  const [text, setText] = useState("");
  const [imgUrl,setImgUrl]=useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef();

  const handleImageChange = async(e) => {
    const file=e.target.files[0];

    const reader=new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
    const upImgUrl=await uploadFile(file);
    setImgUrl(upImgUrl.secure_url);
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current)fileInputRef.current.value='';
  };

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
   
    try {
      console.log(imgUrl);
      await sendMessage({
        text:text.trim(),
        image:imgUrl,
      });
  
      setText("");
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value="";


    } catch (error) {
       toast.error("Failed to send message:",error);
    }
    
  };
  return (
    <>
      <div className="p-3 w-100">
        {imagePreview && (
          <div className="mb-3 d-flex align-items-center">
            <div className="position-relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-25 h-auto rounded border border-secondary ms-auto"
              />
              <button
                onClick={removeImage}
                className={style.removebtn}
                type="button"
              >
                <X/>
              </button>
              
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage}>
          <div className="d-flex ">
            <input
              className={style.msginp}
              type="text"
              placeholder="Type a message . . ."
              onChange={(e)=>setText(e.target.value)}
              value={text}
            />
            <div className={style.send_body}>
              <div>
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button className="">
                  <Image
                    size={20}
                    onClick={() => fileInputRef.current?.click()}
                    
                  />
                </button>
              </div>
              <div>
                <button className="btn btn-sm border border-0 text-white" type="submit" disabled={!text.trim() && !imagePreview}>
                  <Send size={22}/>
                </button>
              </div>
            </div>
          </div>
        </form>
        
      </div>
    </>
  );
}

export default MessageInput;
