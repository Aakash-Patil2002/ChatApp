const User=require('../models/user-model');
const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user?._id;
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is require"});
        }
        //1:9:50
        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:profilePic},{new:true})
        
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("error in update profile controller: ",error)
    }
}

module.exports=updateProfile; 