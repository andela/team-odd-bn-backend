import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Customize from './Customize';

dotenv.config();
/**
 * @export
 * @class Helper
 */
export default class AuthenticateToken {
  /**
    * Store data in Jwt
    * @static
    * @param {object} data data object
    * @memberof AuthenticateToken
    * @returns {object} signToken
    */
  static signToken(data) {
    const { lastName, firstName, ...newData } = data;
    const token = jwt.sign(newData, process.env.JWT_KEY);
    return token;
  }

  /**
   * register a new
   * @static
   * @param {Object} req the request body
   * @param {Object} res the response body
   * @param {Object} next the response body
   * @param {Object} token the token to be verified
   * @returns {Object} userInfo
   */
  static verifyToken(req, res, next) {
    const token = !req.headers.token ? req.params.token : req.headers.token;
    if (!token) {
      return Customize.errorMessage(req, res, 'Please, insert the token', 401);
    }
    jwt.verify(
      token, process.env.JWT_KEY,
      (err, result) => {
        if (err) {
          return Customize.errorMessage(req, res, err, 401);
        }
        req.user = result;
        next();
      }
    );
  }
}
