const mongoose=require("mongoose");

const connectDB= async () =>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }catch(error){
        console.log("MongoDV connection error: ",error)
    }
};

module.exports=connectDB;