import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to register new user and login user all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const login = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfull'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//controller to authorise the user for forgotten password

export const authorisedUserOrNot=async(req,res,next)=>{
  try{
    const data=await UserService.authorisedUser(req.body);
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data:data,
      message:'Authorised user you can proceed further'
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }
};

//controller to reset the password

export const resetPassword=async(req,res,next)=>{
 try{
    const data=await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data:data,
      message:'reset password is successfull ---!!!!!!'
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }
}


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    console.log("req.body===========================>",req.body);
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};




