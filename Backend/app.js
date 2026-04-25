const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connectToDB=require('./db/utils/db');
const app=express();
app.use(cors());
connectToDB();


app.get('/',(req,res)=>{
    res.send(`Hello World`);
})

module.exports={
    app

}