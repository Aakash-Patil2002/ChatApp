const jwt= require("jsonwebtoken");
const generateTocken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
 
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,//Milli seconds
        httpOnly:true, //prevent xss attacks cross-site scripting attacks
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"

    })

    return token;
};

module.exports=generateTocken;