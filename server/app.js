const express = require("express");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const connectDB = require("./utils/db");
const cors =require("cors");
const authRoutes=require('./router/auth.route');
const messageRoutes=require('./router/message.route');
const app=require('./utils/socket').app;
const server=require('./utils/socket').server;

dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)
const PORT=5001;
server.listen(PORT,()=>{
    console.log("server running at " + PORT);
    connectDB();
});
 