import express from 'express';
import Validate from '../../middlewares/Validate';
import UserController from '../../controllers/UserController';
import AuthenticateToken from '../../helpers/AuthenticateToken';


const userRoute = express.Router();

userRoute.put('/profile-settings',
  AuthenticateToken.verifyToken,
  Validate.profileUpdateRules(),
  UserController.updateProfile);


export default userRoute;
