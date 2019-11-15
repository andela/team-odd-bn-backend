import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import customize from '../helpers/Customize';

dotenv.config();

const verifyUser = (req, res, next) => {
  if (!req.headers.token) {
    return customize.errorMessage(req, res, 'Please, insert the token', 401);
  }
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, result) => {
    if (err) {
      return customize.errorMessage(req, res, err, 401);
    }
    req.user = result;
    next();
  });
};
export default verifyUser;
