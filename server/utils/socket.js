
const Server =require("socket.io").Server
const http=require("http");
const express=require("express");

const app=express();

const server=http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://aakashpatil-chatapp.netlify.app"]
    }
});

const getReceiverSocketId=(userId)=>{
    return userSocketMap[userId];
}

const userSocketMap={}; //{useId:socketId}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id


    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports.server=server;
module.exports.app=app;
module.exports.io=io;
module.exports.getReceiverSocketId=getReceiverSocketId;

