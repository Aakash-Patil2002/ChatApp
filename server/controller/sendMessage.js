const cloudinary=require("../utils/cloudinary");
const Message=require("../models/message-model");
const getReceiverSocketId=require('../utils/socket').getReceiverSocketId;
const io =require('../utils/socket').io;
const sendMessage= async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:image
        });

        await newMessage.save();

        const receiverSocketId= getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}
module.exports=sendMessage;