import express from'express';
const router=express.Router();
import {body} from 'express-validator';
import userController from '../controller/user.controller.js';



// router.post('/operation/register',[
//   body('fullName.firstName').isLength({min:3}).withMessage('first name must have 3 characters atleast'),
//   body('email').isEmail().withMessage('Invalid Email'),
//   body('password').isLength({min:6}).withMessage('Password Must Be At Least 6 Character long')
// ],async(req,res)=>{
//     return await  userController.registerUser();
// })

router.post('/operation/register',async(req,res)=>{
    return await  userController.registerUser(req,res);
});


export default router;
