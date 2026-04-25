const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controller/user.controller')



router.post('/register',[
  body('fullName.firstName').isLength({min:3}).withMessage('first name must have 3 characters atleast'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password Must Be At Least 6 Character long')
],async(res,res)=>{
    return userController.registerUser(req,res,next);
})


module.exports=router;