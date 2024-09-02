const express=require('express');
const router=express.Router();
const authentication=require('../middleware/authentication');
const {add}=require('../controllers/queries');

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    console.log('got data from admin login');
    try{
        const result= await authentication(username,password);
        res.send(result);
    }
    catch(error){
        console.log('Error:',error);
        res.status(500).send('internal server error');
    }
})

router.post('/add',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const savedAdmin=await add(username,password);
        console.log(savedAdmin);
        res.status(201).send(savedAdmin);
    }
    catch(error){
        console.error('Error adding admin:',error.message);
        res.status(500).send('internal server error');
    }
})


router.post('/logout',async(req,res)=>{
   res.send(`successfully logout`);
    return {success:true,message:`successful logout`};
})
module.exports=router;