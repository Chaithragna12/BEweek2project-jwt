import express from 'express';
const app=express();
import dbconnect from './src/config/dbconnection.js'; //import db //import router
import routes from './src/routes/routes.js';
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