import  mongoose from 'mongoose';

export function connectToDB(){
   mongoose.connect(process.env.DB_CONNECT).then(
      ()=>{
        console.log('Connection With DB.')
      }
   ).catch(err=>console.log(err));
}

export default {
   connectToDB
}