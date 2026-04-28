import { User } from '../models/user.model.js';
import { createUserQuery } from '../db/queries/user.queries.js';

const registerUserService = async (data) => {
  const { fullName, email, password } = data;

  if (!fullName || !email || !password) {
    return {
      success: false,
      message: 'fullName, email and password are required.'
    };
  }

  try {
    const hashedPassword = await User.hashPassword(password);
    console.log(hashedPassword);
    const user = await createUserQuery(
      fullName.firstName,
      fullName.lastName,
      email,
      hashedPassword
    );
    const token=await user.generateAuthToken();
    console.log(token);
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

export default {
    registerUserService
}