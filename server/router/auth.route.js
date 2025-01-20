const express=require("express");
const router=express.Router();
const signup=require("../controller/signup.controller");
const login=require('../controller/login.controller');
const logout=require('../controller/logout.controller');
const protectRoute=require("../middleware/auth-middleware");
const updateProfile=require("../controller/updateProfile");
const checkAuth=require("../controller/checkAuth");


router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/update-profile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);

router.use("/",(req,res)=>{
    res.send("<h1>This is homepage</h1>")
})
module.exports=router;