import jwt from 'jsonwebtoken';
import Response from '../helpers/Response';
/**
  * verify token
  * @param {object} req request object
  * @param {object} res response object
  * @param {object} next response object
  * @returns {object} data
  * next
 */
const verifyToken = (req, res, next) => {
  const token = !req.headers.token ? req.params.token : req.headers.token;
  if (!token) {
    return Response.errorMessage(req, res, 'Please, insert the token', 401);
  }
  jwt.verify(
    token, process.env.JWT_KEY,
    (err, result) => {
      if (err) {
        return Response.errorMessage(req, res, err, 401);
      }
      req.user = result;
      next();
    }
  );
};

export default verifyToken;
