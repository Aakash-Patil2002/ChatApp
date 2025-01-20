const express=require("express");
const protectRoute = require("../middleware/auth-middleware");
const router =express.Router();
const getUsersForSidebar=require("../controller/getUsersForSidebar");
const getMessages=require("../controller/getMessages");
const sendMessage=require("../controller/sendMessage");

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
module.exports=router   