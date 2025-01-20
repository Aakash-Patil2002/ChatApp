const jwt= require("jsonwebtoken");
const generateTocken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
 
    res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    sameSite: "None", // Allows the cookie to be sent in cross-site contexts
    secure: process.env.NODE_ENV !== "development", // Requires HTTPS in production
});


    return token;
};

module.exports=generateTocken;
