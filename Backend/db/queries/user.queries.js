const userModel = require("../../models/user.model");

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

module.exports={
    createUserQuery
}