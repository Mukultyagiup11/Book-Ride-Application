import mongoose from 'mongoose';
import bcrypt  from'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, 'first name must have 3 characters atleast']
    },
    lastName: {
      type: String,
      minlength: [3, 'Last name must be atleast 3 characters']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be atleast 5 characters long']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
});


userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const User= mongoose.model('User', userSchema);

export default User;