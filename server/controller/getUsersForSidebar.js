const User=require("../models/user-model")
const getUsersForSidebar= async (req,res)=>{
    try {
        const loggedInUserId=req.user?._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error });
    }
}

module.exports=getUsersForSidebar;