const User=require('../models/user-model');
const bcrypt=require("bcryptjs");
const generateTocken=require("../utils/utils");
const signup= async (req,res)=>{
    const {fullName,email,password}=req.body
    try {

        //hash password 
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are require"})
         }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 character"})
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password:hashpassword
        })

        if(newUser){
            // generate jwt token here
            generateTocken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });
        }else{
            res.status(400).json({message:"Invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports=signup;