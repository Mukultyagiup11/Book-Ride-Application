const userModel=require('../models/user.model');
import {createUserQuery} from '../db/queries/user.queries';

export const registerUserService=async(data)=>{
    const {firstName,lastName,email,password}=data;

    if(!firstName||!email||!password){
        return {
            success:false,
            message:`firstName,email and Password are required.`
        }
    }
    
    try {
       const user=await createUserQuery(firstName,lastName,email,password);
       return {
        success:true,
        data:user
       }
       
    } catch (error) {
        console.log('Internal Server Error...');
        return {
            success:false,
            error:error.message,
            message:'Internal Server Error'
        }
    }

}


module.exports={
    registerUserService
}