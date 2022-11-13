import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(2).required(),
    LastName:Joi.string().required(),
    EmailID:Joi.string().email().lowercase().required(),
    Password:Joi.string().min(4).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
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
    next(error);
  }else{
    req.validatedBody=value;
    next();
  }
}
