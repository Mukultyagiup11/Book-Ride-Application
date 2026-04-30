import {User} from "../../models/user.model.js";

export const createUserQuery=async(firstName,lastName,email,password)=>{
       return await User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
       });
}

export const findUserQuery=async(email,password)=>{
    return await User.findOne({email}).select(`+password`);
}

export default {
    createUserQuery,
    findUserQuery
}