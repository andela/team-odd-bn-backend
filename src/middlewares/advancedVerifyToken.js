import jwt from 'jsonwebtoken';
import Response from '../helpers/Response';
import UserService from '../services/UserService';
/**
  * verify token
  * @param {object} req request object
  * @param {object} res response object
  * @param {object} next response object
  * @returns {object} data
  * next
 */
const advancedVerifyToken = (req, res, next) => {
  const token = !req.headers.token ? req.params.token : req.headers.token;
  if (!token) {
    return Response.errorMessage(req, res, 'Please, insert the token', 401);
  }
  jwt.verify(
    token, process.env.JWT_KEY,
    async (err, result) => {
      if (err) {
        return Response.errorMessage(req, res, err, 401);
      }
      const isTokenExist = await UserService.blacklistToken(token);
      if (isTokenExist) {
        return Response.errorMessage(req, res, 'You have provided an invalid token', 401);
      }
      result.token = token;
      req.user = result;
      next();
    }
  );
};

export default advancedVerifyToken;
