import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import style from "./Loginpage.module.css";
import { Link, useNavigate } from "react-router-dom";
import msg from "../../assets/message.png";
import sideimg from "../../assets/rb_583.png";
import toast from "react-hot-toast";

import { Loader } from "lucide-react";
const Loginpage = () => {
  const { login, isLoggingIn, authUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.email || !formData.password) {
      return toast.error("All fields are require...!");
    }
    if (!emailRegex.test(formData.email)) {
      return toast.error("Enter valid email");
    }
    if (!passwordRegex.test(formData.password)) {
      return toast.error("Enter strong password");
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) {
      const iscorr = login(formData);
      iscorr
        .then((result) => {
          if (result && authUser) {
            console.log("this is redirect to home");
            navigate("/");
            console.log("this is after");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={style.login_wrapper}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className={style.form_wrapper}>
              <div className={style.topimg}>
                <img src={msg} alt="message" />
              </div>
              <h2 className={style.signup_heading}>Login Account</h2>
              <p className={style.signup_para}>
                Get started with login your account
              </p>
              <form className="form" onSubmit={submitForm}>
                <div className="inp-label-div">
                  <label>Email:</label>
                  <div className="inp-icon-div">
                    <span className="input-icon">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="inp"
                      type="text"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <div className="inp-label-div">
                  <label>Password</label>
                  <div className="inp-icon-div">
                    <span className="input-icon">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="inp"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Passsword"
                    />
                    <span
                      className="eye-icon"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  className="form-btn"
                  type="submit"
                  disabled={isLoggingIn}
                >
                  Login
                </button>

                <p>
                  Already have account? <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="d-none d-md-block col-md-6">
            <div className={style.right_part}>
              <div>
                <img
                  className="right-image"
                  src={sideimg}
                  alt="message images"
                />
                <div>
                  <h6 className="join-com">Join our community</h6>
                  <p className="right-para">
                    Connect with friends, share movement, and stay in touch with{" "}
                    <br /> your loved ones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoggingIn ? (
        <>
          <div className="flex items-center justify-center h-screen loader">
            <Loader className="size-10 animate-spin" />
          </div>
        </>
      ) : (
        "Create Account"
      )}
    </div>
  );
};

export default Loginpage;
