import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from './pages/Homepage/Homepage';
import Signuppage from './pages/Signuppage/Signuppage';
import Loginpage from './pages/Loginpage/Loginpage';
import Profilepage from './pages/Profilepage/Profilepage';
import Settingspage from './pages/Settingspage/Settingspage';
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";

function App() {
  
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  
  
  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen loader">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:authUser? <Homepage/>: <Navigate to="/login"/>
    },
    {
      path:"/signup",
      element:!authUser?<Signuppage/>:<Navigate to="/"/>
    },
    {
      path:'/login',
      element:!authUser?<Loginpage/>:<Navigate to="/"/>
    },
    {
      path:"/profile",
      element:authUser?<Profilepage/>:<Navigate to="/login"/>
    },
    {
      path:'/settings',
      element:<Settingspage/>
    }
    
  ]);

  return (
    <div className="wrapper" >
      <RouterProvider router={router}/>
      <Toaster/>
    </div>
  );
}

export default App;
