import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    //console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    //console.log(bearerToken);

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.EmailID=user.EmailID;
    //console.log(user);
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code:HttpStatus.UNAUTHORIZED,
      message:`${error}`
    });
  }
};
