const User=require('../models/user-model');
const bcrypt=require("bcryptjs");
const generateTocken = require('../utils/utils');
const login= async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await  User.findOne({email})
        if(!user){
           return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Enter valid password"});
        }


        generateTocken(user._id,res);

        res.status(200).json({
            id:user._id,
            fullname:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });

    } catch (error) {
        console.log("Error in login contoller",error.message);
        res.status(500).json({message:"Internal server error"+error});
    }
};

module.exports=login;