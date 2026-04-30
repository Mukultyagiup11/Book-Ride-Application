import {User}  from '../models/user.model.js';
import { createUserQuery,findUserQuery } from '../db/queries/user.queries.js';

const registerUserService = async (data) => {
  const { fullName, email, password } = data;

  if (!fullName ||
  !fullName.firstName ||
  !email ||
  !password) {
    return {
      success: false,
      message: 'fullName, email and password are required.'
    };
  }

  try {
    const hashedPassword = await User.hashPassword(password);
    const user = await createUserQuery(
      fullName.firstName,
      fullName.lastName,
      email,
      hashedPassword
    );
    const token=await user.generateAuthToken();
    return {
      success: true,
      data: user,
      Token:token
    };

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Internal Server Error',
      error: error.message
    };
  }
};

 const loginUserService=async(data)=>{
  const {email,password}=data;
  if(!email || ! password){
    console.log('Email and Password are required.');
    return{
      success:false,
      message:`Email and Password are required.`
    }
  }

  try {
    const user=await findUserQuery(email);
    if(!user){
      return{
        success:false,
        message:'Invalid email and password'
      }
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
      return{
        success:false,
        message:'Invalid email and password'
      }
    }
    const token=await user.generateAuthToken();
    return{
      success:true,
      message:'User logged In Successfully.',
      user,
      Token:token
    }
  } catch (error) {
    console.log(`Internal Server Error`);
    return{
      success:false,
      message:"Internal Server Error"
    }
}
}

export default {
    registerUserService,
    loginUserService
}