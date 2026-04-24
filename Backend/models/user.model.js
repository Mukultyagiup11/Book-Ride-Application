const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
   fullName:{
       firstName:{
         type:String,
         required:true,
         minlength:[3,'first name must have 3 characters atleast']
       },
       lastName:{
        type:String,
        required:false,
        minlength:[3,`Last namemust be atleast 3 characters`]

       }
   }
})