const jwt= require("jsonwebtoken");
const generateTocken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
 
    res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "None", // Allow cross-site in production
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
});


    return token;
};

module.exports=generateTocken;
