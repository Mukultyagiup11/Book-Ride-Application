import userModel from "../../models/user.model.js";

export const createUserQuery=async(firstName,lastName,email,password)=>{
       return await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
       });
}

export default {
    createUserQuery
}