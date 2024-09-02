const bcrypt=require('bcrypt');
const schema=require('../models/schema');

const add= async(username,password)=>{
    const exist=await schema.findOne({username});
    if(exist){
        throw new Error('This Username already exist');
    }
    const hashedpassword= await bcrypt.hash(password,10);
    const create=new schema({username:username,password:hashedpassword});
    const save=await create.save();
    console.log(save);
    return save;
}
module.exports={add};
