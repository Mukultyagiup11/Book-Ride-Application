const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

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
   },
   email:{
    type:String,
    required:true,
    unique:true,
    minlength:[5,`Email must be atleast 5 characters long`]
   },
   password:{
    type:String,
    required:true,
    select:false
   },
   socketId:{
    type:String
   }
})

// userSchema.pre('save',async function(next){
//    if(!this.isModified('password'))return next();
//    const salt =await bcrypt.genSalt(10);
//    this.password=await bcrypt.hash(this.password,salt);
//    next();
// })

userSchema.methods.genrateAuthToken=function(){
  const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
}

userSchema.methods.comparePassword=function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10);
}


const userModel=mongoose.model('User',userSchema);

module.exports=userModel;