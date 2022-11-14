import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName:Joi.string().required(),
    EmailID:Joi.string().email().lowercase().required(),
    Password:Joi.string().min(4).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginValidator=(req,res,next)=>{
  const schema=Joi.object({
    Password:Joi.string().min(4).required(),
    EmailID:Joi.string().email().lowercase().required()
  });
  const{error,value}=schema.validate(req.body);
  if(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }else{
    req.validatedBody=value;
    next();
  }
}
