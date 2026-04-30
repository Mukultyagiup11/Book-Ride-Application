
import { User } from '../models/user.model.js';
import userService from '../service/user.service.js';
import validationFunction from './validateFunction.js'

export const registerUser=async(req,res)=>{
    try {
        const data= await validationFunction.validateRequest(req,res);
        if(!data){
             return res.status(400).json({
                success: false,
                message: "Validation failed"
            });
        };
        const result=await userService.registerUserService(data);
        return res.status(200).send(result);
    } catch (error) {
        console.log(`Error In Register The User.`);
        return res.status(500).json({
            success: false,
            message: 'Error In Register The User.'
        });
    }
}

export const loginUserContoller=async(req,res)=>{
    try {
       const data=await validationFunction.validateRequest(req,res);
       if(!data)return;
       const result=await userService.loginUserService(data);
       await res.status(200).send(result);
    } catch (error) {
       console.log(`Error in login the user.`);
       return{
        success:false,
        message:'Erroe in login the user.'
       }
    }
}

export default {
    registerUser,
  loginUserContoller
}

