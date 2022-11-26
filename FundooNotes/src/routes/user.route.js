import express from 'express';
import * as userController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import  {userResetPasswordAuth} from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

//route to login the user to the home page
router.post('/login',loginValidator, userController.login);

//route to forgot password
router.post('/forgotPassword',userController.forgotPassword);

//route to reset the password
router.put('/resetPassword',userResetPasswordAuth,userController.resetPassword);

export default router;
