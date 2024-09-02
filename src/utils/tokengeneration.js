import jwt from 'jsonwebtoken';

const generatetokensetcookie=(userid,res)=>{
    const token=jwt.sign({userid},process.env.jwt_secret,{expiresIn:'1h'});
    res.cookie("jwt",token,{
        maxAge: 1 * 60 *60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=='Development',
    })
}
export default generatetokensetcookie;