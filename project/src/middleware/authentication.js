const bcrypt=require('bcrypt');
const schema=require('../models/schema');
authenticationadmin=async(username,password)=>{
    console.log('Authentication Verifying');
    try{
        const user=await schema.findOne({username});
        if(!user){
            console.log('No admin found');
            return {success:false,message:`Authentication failed. User not found`}
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            console.log('Authentication failed.');
            return {success:false,message:`Authentication failed. Incorrect password`};
        }
        console.log('Authentication successful');
        return {success:true,message:`Authentication successful`};
    }
    catch(error){
        throw new Error(`Authentication failed`);
    }
}
module.exports=authenticationadmin;