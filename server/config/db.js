import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database at ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
    
}