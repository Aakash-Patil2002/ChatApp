import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    
    isCheckingAuth:true,
    onlineUsers:[],

    socket:null,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");

            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            set({authUser:null});
        } finally {
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:false})
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully...!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false});
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logout successfully...!");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data)
            set({authUser:res.data});
            toast.success("Login successfull...!");
            get().connectSocket();
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIn:false});
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            console.log("this is upadate profile",data)
            const res=await axiosInstance.post("/auth/update-profile",data)
            set({authUser:res.data});
            toast.success("Profile Updateded Successfully...!");
        } catch (error) {
            console.log("Error in update profile")
            toast.error(error.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    },

    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return;

        const socket=io("http://localhost:5001",{
            query:{
                userId:authUser._id,
            }
        });
        
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }

}));  