import  dotenv from 'dotenv';
dotenv.config();
//const express=require('express');
import express from 'express';
//const cors=require('cors');
import cors from 'cors';
import {connectToDB} from './db/utils/db.js';
import router from './routes/user.route.js';
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors());
connectToDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send(`Hello World`);
})

app.use('/rideApp/v1',router);

export default app;