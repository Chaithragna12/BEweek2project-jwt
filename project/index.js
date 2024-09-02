const express=require('express');
const app=express();
const dbconnect=require('./src/config/dbconnection'); //import db
const routes=require('./src/routes/routes'); //import router
dbconnect();
app.use(express.json());

app.post('/',(req,res)=>{
    res.send('Hello, How are you??');
})
app.use('/auth',routes);

const port=5000;
app.listen(port,()=>{
    console.log(`Server is running with ${port}`);
})