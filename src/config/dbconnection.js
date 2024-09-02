import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connecttodb=async()=>{
    try{
        await mongoose.connect(process.env.DBCONNECT);
        console.log('Data Base is connected');
    }
    catch(error){
        console.log('Error in connecting to DB',error);
    }
}
export default connecttodb;