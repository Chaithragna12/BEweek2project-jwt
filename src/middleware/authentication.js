import jwt from 'jsonwebtoken';
import admin from '../models/schema.js';
const protectRoute= async(req,res,next)=>{
    try{
        const token=req.cookie.jwt;
        if(!token){
            return res.status(401).json({error:'Unauthorized-No token provided'})
        }
        const decode=jwt.verify(token,process.env.jwt_secret);
        if(!decode){
            return res.status(401).json({error:'Unauthorized-Invalid user'});
        }
        const user=await admin.findById(decode.userid).select('password');
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log('Error in protecting the Route',error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
export default protectRoute;