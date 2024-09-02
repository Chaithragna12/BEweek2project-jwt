import bcrypt from 'bcrypt';
import schema  from '../models/schema.js';
import generatetokensetcookie from '../utils/tokengeneration.js';

 export const signup= async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await schema.findOne({username});
        if(user){
            return res.status(400).json({Error:`User Already exists`});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(password,salt);
        const create=new schema({username:username,password:hashedpassword});
        if(create){
            generatetokensetcookie(create._id,res);
            await create.save();
            console.log('New admin created');
            res.status(201).json({_id:create._id,username:create.username,})
        }
        else{
            res.status(400).json({error:'Invalid user data'});
        }

    }
    catch(error){
        console.log('Error:',error);
        res.status(500).send('internal server error');
    }
}

export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await schema.findOne({username});
        const ispasswordcorrect=await bcrypt.compare(password,user?.password||'');
        if(!user||!ispasswordcorrect){
            return res.status(400).json({success:false,error:'Invalid username or password'});
        }
        generatetokensetcookie(user._id,res);
        console.log("Admin logged in ",user);
        res.status(200).json({success:true,username:user.username});
    }
    catch(error){
        console.log('Error',error);
        res.status(500).json({success:false,error:'internal server error'});
    }
}

export const logout=async(req,res)=>{
    try{
        console.log('Admin logout');
        res.cookie('jwt','',{maxAge:0});
        res.status(200).json({message:'logged out successfully'});
    }
    catch(error)
    {
        console.log('error in login controllers',error.message);
        res.status(500).json({error:'internal server error'})
    }
}