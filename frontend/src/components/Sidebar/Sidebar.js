import React, { useEffect } from 'react'
import style from './Sidebar.module.css';
import {Users} from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import SidebarSkeleton from '../SidebarSkeleton/SidebarSkeleton';
import { useAuthStore } from '../../store/useAuthStore';
function Sidebar() {
  const {getUsers,users,setSelectedUser,isUsersLoading}=useChatStore();
 const {onlineUsers}=useAuthStore();
  useEffect(()=>{  
    getUsers();
  },[getUsers]);

  if(isUsersLoading) return <SidebarSkeleton/>
  return (
      <aside className={style.sidebar}>
          <div className='d-flex mb-3 px-3'>
            <Users className={style.users}/>
            <h3 className={style.sidebar_heading}>Contacts</h3>
          </div>
          <div className={style.skeleton_body} >
         
           {
            users.map((user)=>{
              
              return(
              <button key={user._id} className={`${style.user} `} onClick={()=>setSelectedUser(user)} >
                <div className='d-flex w-100'>
                  <div className='me-md-4'><img className={style.profilePic} src={user.profilePic?user.profilePic:"https://via.placeholder.com/100"} alt={user.name}/></div>
                  <div className={style.profDetails}>
                    <h6>{user.fullName}</h6>
                    {
                      onlineUsers.includes(user._id)?
                      <span className='text-success'>Online</span>
                      :
                      <span >Offline</span>

                    }
                  </div>
                </div>
              </button>
              )
            })
           }
          </div>
    </aside>
  )
}

export default Sidebar