import msg from '../../assets/message.png';
import style from './Navbar.module.css';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
const Navbar=()=>{
  const {logout}=useAuthStore();
  const navigate=useNavigate();
  return (
    <nav className={style.nav}>
      <div className="container p-0">
        <div className="d-flex justify-content-between">
          <div className={style.logo}>
            <img src={msg} alt='message imgage'/>
            <h3>Chatty</h3>
          </div>
          <div className='d-flex gap-4'>
            <div className='d-flex align-items-center cursor-pointer'>
              <span className={style.nav_icon}><i className="fa-solid fa-house"></i></span>
              <h6 onClick={()=>navigate("/")} className={style.nav_icon_text}>Home</h6>
            </div>
            <div className='d-flex align-items-center cursor-pointer'>
              <span className={style.nav_icon}><i className="fa-regular fa-user"></i></span>
              <h6 onClick={()=>navigate("/profile")} className={style.nav_icon_text}>Profile</h6>
            </div>
            <div className='d-flex align-items-center cursor-pointer' onClick={logout}>
              <span className={style.nav_icon}><i className="fa-solid fa-right-from-bracket"></i></span>
              <h6 className={style.nav_icon_text}>Logout</h6>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar