import { userAuth } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



//register new user
export const newUser = async (body) => {
  const existingEmailID=await User.findOne({EmailID:body.EmailID});
  if(existingEmailID===null){

    const saltRounds=10;
    const hashPassword=bcrypt.hashSync(body.Password,saltRounds);
    body.Password=hashPassword;

    const data=await User.create(body);
    return data;
  }else{
    throw new Error("Oops, User with same EmailId already exists, so use different!!!");
  }
};

//find the Authorised user and login the user-------------

export const loginUser=async(body)=>{
  const data=await User.findOne({EmailID:body.EmailID});
  if(data!==null){
    const passwordAuthentication=bcrypt.compareSync(body.Password, data.Password);
    if(passwordAuthentication){
      var token=Jwt.sign(
        {FirstName:data.FirstName,EmailID:data.EmailID,id:data._id},
        process.env.SECRET_KEY
      );
      return token;
    }else{
      throw new Error("invalid password");
    }
  }else{
    throw new Error("invalid mail id");
  }
};



