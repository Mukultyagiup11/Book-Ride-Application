import {User}  from '../models/user.model.js';
import { createUserQuery,findUserQuery } from '../db/queries/user.queries.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';

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
      token:token
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
    const token=user.generateAuthToken();
    return{
      success:true,
      message:'User logged In Successfully.',
      user,
      token:token
    }
  } catch (error) {
    console.log(`Internal Server Error`);
    return{
      success:false,
      message:"Internal Server Error"
    }
}
}

export const logoutService=async(data)=>{
  const {token}=data;
  if(!token){
    return {
      success:false,
      message:`Token rerquired for logout session.`
    }
  }

  try {
      const token=res.cookies.token|| res.headers.authorization.split(' ')[1];
      await blacklistTokenModel.create({token});
     return {
      success:true,
      message:'LoggedOut'
     }
  } catch (error) {
    console.log('Internal Server Error.');
    return{
      success:false,
      message:`Internal server error.`
    }
  }

}

export default {
    registerUserService,
    loginUserService,
     logoutService
}