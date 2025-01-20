import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import styles from "./Profilepage.module.css";
import uploadFile from "../../helpers/uploadFile";
import Navbar from "../../components/Navbar/Navbar";
function Profilepage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleImageUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    const img_url=await uploadFile(file);
    updateProfile({profilePic:img_url.secure_url})
  }
  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div
        className={
          styles.profile_wrapper +
          " d-flex align-items-center justify-content-center"
        }
      >
        <div className={styles.profile_body}>
          <div className={styles.container}>
            <div className="text-center">
            <h2 className={styles.title}>Profile</h2>
            <p className={styles.subtitle}>Your profile information</p>
            </div>

            {/* Profile Image */}
            <div className={styles.profileImageContainer}>
              <img
                src={authUser.profilePic || "https://via.placeholder.com/100"}
                alt="Profile"
                className={styles.profileImage}
              />
              <span className={styles.cameraIcon}><span>+</span>
              <input type="file" accept="image/*"  id="avtar-image" onChange={handleImageUpload} className={styles.photo}/>
              </span>
            </div>
            <p className={styles.updateText}>
            {
              isUpdatingProfile?"Updating":"Profile Photo"
            }
              
            </p>

            {/* Profile Form */}
            <div className={styles.form}>
              <label className={styles.label}>Full Name</label>
              <input
                className={styles.input}
                type="text"
                value={authUser.fullName}
                readOnly
              />

              <label className={styles.label}>Email Address</label>
              <input
                className={styles.input}
                type="email"
                value={authUser.email}
                readOnly
              />
            </div>

            {/* Account Information */}
            <div className={styles.accountInfo}>
              <h3 className={styles.accountTitle}>Account Information</h3>
              <div className={styles.infoRow}>
                <span>Member Since</span>
                {
                  authUser.createdAt && <span>{authUser.createdAt.split("T")[0]}</span>
                }
                
              </div>
              <div className={styles.infoRow}>
                <span>Account Status</span>
                <span className={styles.activeStatus}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profilepage;
