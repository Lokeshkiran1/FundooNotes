import { userAuth } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import bcrypt from 'bcrypt'

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const existingEmailID=await User.findOne({EmailID:body.EmailID});
  if(existingEmailID===null){

    const saltRounds=10;
    const hashPassword=await bcrypt.hash(body.Password,saltRounds);
    body.Password=hashPassword;

    const data=await User.create(body);
    return data;
  }else{
    throw new Error("Oops, User with same EmailId already exists, so use different!!!");
  }
};

//find the Authorised user and login to home page-------------

export const findUser=async(body)=>{
  const data=await User.findOne({EmailID:body.EmailID});
  if(data!==null){
    const passwordAuthentication=await bcrypt.compare(body.Password, data.Password);
    if(passwordAuthentication){
      return data;
    }else{
      throw new Error("invalid password");
    }
  }else{
    throw new Error("invalid mail id");
  }
};



//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (_id) => {
  const data = await User.findById(_id);
  return data;
};
