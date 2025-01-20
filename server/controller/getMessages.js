const User=require("../models/user-model");
const Message=require("../models/message-model");
const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages contoller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports=getMessages;