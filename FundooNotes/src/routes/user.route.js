import express from 'express';
import * as userController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

//route to login the user to the home page
router.post('/login',loginValidator, userController.login);

export default router;
