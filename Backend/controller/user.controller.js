
import { User } from '../models/user.model.js';
import userService from '../service/user.service.js';
import validationFunction from './validateFunction.js'

export const registerUser=async(req,res,next)=>{
    try {
        const data=validationFunction.validateRequest(req,res);
        if(!data)return;
        const result=await userService.registerUserService(data);
        return res.status(200).send(result);
    } catch (error) {
        console.log(`Error In Register The User.`);
        return{
            success:false,
            message:'Error In Register The User.'
        }
    }
}

export default {
    registerUser
}